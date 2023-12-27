/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import Button from '@common_button';
import ButtonQty from '@common_buttonqty';
import Thumbor from '@common_image';
import Typography from '@common_typography';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';
import { useTranslation } from 'next-i18next';

const Item = (props) => {
    const {
        errorCartItems,
        quantity,
        custom_price,
        product,
        deleteCart,
        updateCart,
        id,
        configurable_options,
        bundle_options,
        customizable_options,
        SimpleMiniCustomizable,
        ConfigurableMiniCustomizable,
        aw_giftcard_option,
        storeConfig,
        currencyCache,
    } = props;
    const { t } = useTranslation(['common']);
    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;

    const handleUpdateCart = (qty) => {
        updateCart(id, qty);
    };

    return (
        <li className={cx('px-6', 'py-4')}>
            <div id="plugin-minicart-itemsProduct" className={cx('minicart__item--wrapper', 'tablet:max-desktop:py-4', 'flex', 'flex-row', 'gap-4')}>
                <div className={cx('minicart__item--photo-wrapper', 'rounded-[4px]')}>
                    <Link
                        href="/[...slug]"
                        as={`/${product.url_key}`}
                        passHref
                        className={cx(
                            'minicart__item--photo',
                            'tablet:h-[120px]',
                            'tablet:w-[120px]',
                            'mobile:max-tablet:h-[100px]',
                            'mobile:max-tablet:w-[100px]',
                            'block',
                        )}
                    >
                        <Thumbor
                            className="product-image-photo"
                            src={product.small_image.url}
                            alt={product.small_image.label}
                            width={120}
                            height={120}
                            storeConfig={storeConfig}
                        />
                        {custom_price?.row_total_incl_tax?.value === 0 ? <span>{t('common:title:free')}</span> : null}
                    </Link>
                </div>
                <div className={cx('minicart__item--details', 'basis-full')}>
                    <div className={cx('minicart__item--details-child-wrapper', 'grid', 'grid-cols-1', 'gap-y-[10px]')}>
                        <div className={cx('minicart__item--details-child-top-wrapper', 'flex', 'flex-row', 'gap-3', 'justify-between')}>
                            <div className={cx('minicart__item--name-wrapper', 'tablet:max-desktop:basis-[176px]', 'desktop:basis-[320px]')}>
                                <strong className="minicart__item--name">
                                    <Link href="/[...slug]" as={`/${product.url_key}`}>
                                        <Typography variant="p-1" className={cx('normal-case', 'mobile:max-tablet:text-md')}>
                                            {product.name}
                                        </Typography>
                                    </Link>
                                </strong>
                                <div className={cx('minicart__item--option-wrapper')}>
                                    {configurable_options && configurable_options.length ? (
                                        <div className="product-options">
                                            {configurable_options.map((val, idx) => (
                                                <div className={cx('option-wrapper', 'normal-case', 'mobile:max-tablet:text-md')} key={idx}>
                                                    <strong>{val.option_label}</strong>
                                                    {' '}
                                                    :
                                                    {val.value_label}
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {bundle_options && bundle_options.length ? (
                                        <div className="product-options">
                                            {bundle_options.map((val, idx) => (
                                                <div className="option-wrapper" key={idx}>
                                                    <strong>{val.label}</strong>
                                                    {' '}
                                                    :
                                                    <div className="option-wrapper__item">
                                                        {val.values.map((item, idt) => (
                                                            <div key={idt}>
                                                                {item.quantity}
                                                                {' '}
                                                                x
                                                                {item.label}
                                                                {' '}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {cartCustomOptions && cartCustomOptions.length ? (
                                        <div className="product-options">
                                            {cartCustomOptions.map((val, idx) => (
                                                <div className="option-wrapper" key={idx}>
                                                    <div className="flex flex-row option-wrapper__item">
                                                        <strong>
                                                            {val.label}
                                                            {' '}
                                                            :
                                                        </strong>
                                                        {val.values.map((item, idt) => (
                                                            <p key={idt} className="option-item">
                                                                {item.label && item.label !== '' ? item.label : item.value}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {aw_giftcard_option && aw_giftcard_option.length ? (
                                        <div className="product-options">
                                            {aw_giftcard_option.map((val, idx) => (
                                                <div className="option-wrapper" key={idx}>
                                                    <div className="flex flex-row option-wrapper__item">
                                                        <strong>
                                                            {val.label}
                                                            {' '}
                                                            :
                                                        </strong>
                                                        {val.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={cx('minicart__item--delete-wrapper')}>
                                <Button
                                    className={cx(
                                        '!m-0',
                                        '!px-0',
                                        '!py-0',
                                        '!ml-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={() => deleteCart(props)}
                                    icon={<TrashIcon />}
                                    iconProps={{
                                        className: cx('mobile:max-tablet:w-[20px]', 'tablet:w-[24px]', 'text-neutral-500'),
                                    }}
                                    iconOnly
                                    variant="tertiary"
                                    classNameText={cx('!text-neutral-700')}
                                />
                            </div>
                        </div>
                        <div
                            className={cx(
                                'minicart__item--details-qty-price',
                                'tablet:max-desktop:grid',
                                'tablet:max-desktop:grid-cols-1',
                                'tablet:max-desktop:gap-y-2',
                                'desktop:flex',
                                'desktop:flex-row',
                            )}
                        >
                            <div className={cx('details-qty qty', 'desktop:basis-full')}>
                                <ButtonQty value={quantity} onChange={handleUpdateCart} />
                            </div>
                            <div
                                className={cx(
                                    'item-price',
                                    'desktop:basis-[74px]',
                                    'font-semibold',
                                    'mobile:max-tablet:text-md',
                                    'mobile:max-desktop:pt-1',
                                )}
                            >
                                {formatPrice(
                                    custom_price?.price_incl_tax?.value || 0,
                                    custom_price?.price_incl_tax?.currency || 'IDR',
                                    currencyCache,
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorCartItems && errorCartItems.length > 0 && errorCartItems[0] !== null && (
                <div className="error-status-qty">
                    <div className="bg-yellow-600 text-neutral-white p-2">{errorCartItems[0]}</div>
                </div>
            )}
        </li>
    );
};

export default Item;
