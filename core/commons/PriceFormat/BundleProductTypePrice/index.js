import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import useMediaQuery from '@hook/useMediaQuery';
import cx from 'classnames';

const BundleProductTypePrice = ({
    variant = 'lg', priceRange, additionalPrice, currencyCache, textClassName = '',
}) => {
    const { isDesktop } = useMediaQuery();
    const isVariantLg = variant === 'lg';
    const priceVariantDesktopLabel = isVariantLg ? 'bd-1c' : 'bd-1a';
    const priceVariantMobileLabel = isVariantLg ? 'h2' : 'bd-2';
    const priceLabelVariant = isDesktop ? priceVariantDesktopLabel : priceVariantMobileLabel;
    const otherPrice = additionalPrice || 0;
    if (priceRange.maximum_price.final_price.value === priceRange.minimum_price.final_price.value) {
        return (
            <Typography variant={priceLabelVariant} className={cx('price-text', 'text-neutral-400', textClassName)}>
                {formatPrice(priceRange.minimum_price.final_price.value + otherPrice, priceRange.minimum_price.final_price.currency, currencyCache)}
            </Typography>
        );
    }
    return (
        <div className={cx('inline-flex')}>
            <Typography variant={priceLabelVariant} className={cx('price-text-min', 'text-neutral-400', textClassName)}>
                {formatPrice(priceRange.minimum_price.final_price.value + otherPrice, priceRange.minimum_price.final_price.currency, currencyCache)}
            </Typography>
            <Typography variant={priceLabelVariant} className={cx('price-text-seperate', 'text-neutral-400', 'mx-1')}>
                -
            </Typography>
            <Typography variant={priceLabelVariant} className={cx('price-text-max', 'text-neutral-400', textClassName)}>
                {formatPrice(priceRange.maximum_price.final_price.value + otherPrice, priceRange.maximum_price.final_price.currency, currencyCache)}
            </Typography>
        </div>
    );
};

export default BundleProductTypePrice;
