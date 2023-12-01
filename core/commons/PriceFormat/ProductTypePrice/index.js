/* eslint-disable camelcase */
import React from 'react';
import cx from 'classnames';
import Typography from '@common_typography/index';
import { formatPrice } from '@helper_currency';
import { useTranslation } from 'next-i18next';

const getLowestTierPrice = (tier_price) => {
    let lowestTierPrice;
    let min = Number.POSITIVE_INFINITY;
    tier_price.forEach((price) => {
        if (price.final_price.value < min) {
            min = price.final_price.value;
            lowestTierPrice = price;
        }
    });

    return lowestTierPrice;
};

const AsLowAsText = () => {
    const { t } = useTranslation(['common']);
    return (
        <Typography
            variant="bd-2b"
            className={cx('price-text', 'text-neutral-500')}
        >
            {` ${t('common:price:asLowAs')} `}
        </Typography>
    );
};

const StartingAt = () => {
    const { t } = useTranslation(['common']);
    return (
        <Typography
            variant="span"
            className={cx('price-text', 'text-neutral-500')}
        >
            {` ${t('common:price:startFrom')} `}
        </Typography>
    );
};

const SimpleProductTypePrice = ({
    variant = 'md',
    productType,
    priceRange,
    priceTiers,
    specialFromDate,
    specialToDate,
    currencyCache,
    isPdp,
    isQuickView,
    additionalPrice = 0,
}) => {
    const regularPrice = priceRange?.minimum_price?.regular_price || 0;
    const finalPrice = priceRange?.minimum_price?.final_price || 0;
    const otherPrice = additionalPrice || 0;
    const nowTime = new Date(Date.now());
    const startTime = new Date(specialFromDate);
    const endTime = new Date(specialToDate);
    const isSm = variant === 'sm';
    let validSpecial = true;
    if (specialFromDate && specialToDate) {
        validSpecial = nowTime >= startTime && nowTime <= endTime;
    }

    if (productType === 'GroupedProduct' && !isPdp && !isQuickView) {
        return (
            <div className="price-case-grouped">
                <StartingAt />
                <Typography variant="span" className={cx('price-text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                </Typography>
            </div>
        );
    }

    // if has tierprice
    if (priceTiers && priceTiers.length) {
        const lowestPriceTier = getLowestTierPrice(priceTiers);
        // if there are several tierprices
        if (priceTiers.length > 1) {
            // case 1: if has no discount
            if (regularPrice.value === finalPrice.value) {
                return (
                    <div className="price-case-1">
                        {/* case 1 */}
                        <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                        </Typography>
                        {!isPdp && !isQuickView && (
                            <div>
                                <AsLowAsText />
                                <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                                    {formatPrice(lowestPriceTier.final_price.value + otherPrice, lowestPriceTier.final_price.currency, currencyCache)}
                                </Typography>
                            </div>
                        )}
                    </div>
                );
            }
            // case 2: if final price is lowest than lowest tier price
            if (finalPrice.value < lowestPriceTier.final_price.value) {
                return (
                    <div className="price-case-2">
                        {/* case 2 */}
                        <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                        </Typography>
                        <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                            <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                        </Typography>
                    </div>
                );
            }
            // case 3: if final price is higher than lowest tier price
            return (
                <div className="price-case-3">
                    {/* case 3 */}
                    <div className="flex flex-col">
                        <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                        </Typography>
                        <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                            <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                        </Typography>
                    </div>
                    {!isPdp && !isQuickView && (
                        <>
                            <AsLowAsText />
                            <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                                {formatPrice(lowestPriceTier.final_price.value + otherPrice, lowestPriceTier.final_price.currency, currencyCache)}
                            </Typography>
                        </>
                    )}
                </div>
            );
        }

        // else:
        // if there is only one tierprice
        const firstTierPrice = priceTiers[0];
        // case 4: if there is no discount and has tier price
        if (regularPrice.value === finalPrice.value) {
            return (
                <div className="price-case-4">
                    {/* case 4 */}
                    <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                        {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency, currencyCache)}
                    </Typography>
                    <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                </div>
            );
        }
        // case 5: if final price is lower than tier price
        if (finalPrice.value < firstTierPrice.final_price.value) {
            return (
                <div className="price-case-5">
                    {/* case 5 */}
                    <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                        {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                    </Typography>
                    <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                </div>
            );
        }
        // case 6: if tier price is lower than final price and tier price qty is 1
        if (firstTierPrice.quantity === 1 || finalPrice.value === firstTierPrice.final_price.value) {
            return (
                <div className="price-case-6">
                    {/* case 6 */}
                    <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                        {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency, currencyCache)}
                    </Typography>
                    <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                </div>
            );
        }

        // case 7: if tier price is lower than final price but tier price qty > 1
        return (
            <div className="price-case-7">
                {/* case 7 */}
                <div className="flex flex-col">
                    <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text')}>
                        {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                    </Typography>
                    <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                </div>
                {!isPdp && !isQuickView && (
                    <>
                        <AsLowAsText />
                        <Typography variant={isSm ? 'bd-3b' : 'bd-2b'} className={cx('price-text')}>
                            {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency, currencyCache)}
                        </Typography>
                    </>
                )}
            </div>
        );
    }

    // else:
    // if there is no tier price

    // case 8: if there is no discount
    if (regularPrice.value === finalPrice.value) {
        return (
            <Typography
                variant={isSm ? 'bd-2b' : 'h2'}
                className={cx('price-text', 'text-neutral-400', 'price-case-8')}
            >
                {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
            </Typography>
        );
    }
    // case 9: if has discount
    return (
        <div className={cx('price-case-9 price-text-discount', 'inline-flex', 'flex-col')}>
            {/* case 9 */}
            <Typography
                variant={isSm ? 'bd-2' : 'h2'}
                className={cx('price-text', 'text-neutral-400')}
            >
                {
                    validSpecial ? formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)
                        : formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)
                }
            </Typography>
            {
                validSpecial && (
                    <Typography
                        variant={isSm ? 'bd-3b' : 'bd-2b'}
                        className={cx('price-text')}
                    >
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                )
            }
        </div>
    );
};

export default SimpleProductTypePrice;
