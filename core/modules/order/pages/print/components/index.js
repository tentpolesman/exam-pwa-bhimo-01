/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import { modules } from '@config';
import Table from '@core_modules/order/pages/print/components/TableListItem';
import Link from 'next/link';

const PrintOrder = (props) => {
    const {
        t, detail, currency, storeConfig, currencyCache,
    } = props;

    let items = [];

    if (detail.length > 0 && detail[0].detail[0].items.length) {
        const configurableProduct = [];
        detail[0].detail[0].items.map((item) => {
            if (item.parent_item_id == null) {
                const tmp = {};
                const child = detail[0].detail[0].items.filter((childItem) => childItem.parent_item_id === item.item_id);
                tmp.name = child.length ? child[0].name : item.name;
                configurableProduct.push({ ...item, ...tmp });
            }
        });
        const simpleProduct = detail[0].detail[0].items.filter((item) => !configurableProduct.find(({ sku }) => item.sku === sku) && item);
        items = [...configurableProduct, ...simpleProduct];
    }

    return (
        <>
            <div className={classNames('flex flex-col', '')}>
                <div className={classNames('')}>
                    <div className="header-middle__left">
                        <div className="box header-middle__logo">
                            <Link href="/" legacyBehavior>
                                <img
                                    className="header-middle__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <Typography
                            variant="h1"
                            letter="uppercase"
                            type="semiBold"
                            className={classNames('clear-margin-padding', '')}
                        >
                            {t('order:order')}
                            {' # '}
                            {detail[0].order_number || ''}
                        </Typography>
                        <Typography id="status_label" variant="span" size="14" letter="uppercase">
                            {detail[0].status_label || ''}
                        </Typography>
                    </div>
                    <Typography variant="span" className="clear-margin-padding">
                        {formatDate(detail[0].created_at)}
                    </Typography>
                </div>
                <div className="">
                    <div className="flex flex-row start-xs start-sm start-sm start-md start-lg">
                        {/* <div className="xs:basis-full">
                        <Typography
                            variant="span"
                            letter="capitalize"
                            type="regular"
                            className={classNames('clear-margin-padding', '')}
                        >
                            {t('order:orderItem')}
                        </Typography>
                    </div> */}
                        {/* <div className="xs:basis-full">
                        <div className="hidden-mobile">
                            <Table data={items} t={t} currency={currency} {...props} />
                        </div>
                    </div> */}
                    </div>
                </div>
                <div className={classNames('')}>
                    <div className="">
                        <div className="xs:basis-full">
                            <div>
                                <Table
                                    data={items}
                                    t={t}
                                    currency={currency}
                                    currencyCache={currencyCache}
                                    {...props}
                                />
                            </div>
                            {/* <div className="hide-desktop">
                            {items.length > 0
                                    && items.map((item, key) => (
                                        <ItemProduct t={t} key={key} {...item} currency={currency} storeConfig={storeConfig} />
                                    ))}
                        </div> */}
                        </div>
                        <div className="flex flex-row end-xs end-sm end-md">
                            <div className="md:basis-4/12 sm:basis-4/12">
                                {(detail[0].detail[0].subtotal || detail[0].detail[0].subtotal_incl_tax) && (
                                    <div className="">
                                        <Typography variant="span" letter="capitalize" className="">
                                            Sub total
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(
                                                detail[0].detail[0].tax_amount ? detail[0].detail[0].subtotal : detail[0].detail[0].subtotal_incl_tax,
                                                currency,
                                                currencyCache,
                                            )}
                                        </Typography>
                                    </div>
                                )}
                                {/* {detail[0].detail[0].tax_amount && (
                            <div className={''}>
                                <Typography variant="span" letter="capitalize" className={''}>
                                    {t('order:tax')}
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    {formatPrice(detail[0].detail[0].tax_amount, currency)}
                                </Typography>
                            </div>
                        )} */}
                                {detail[0].detail[0].payment && (
                                    <div className="">
                                        <Typography variant="span" letter="capitalize" className="">
                                            {t('order:shipping')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].payment.shipping_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].discount_amount ? (
                                    <div className="">
                                        <Typography variant="span" letter="capitalize" className="">
                                            {t('order:discount')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].discount_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                                    <div className="">
                                        <Typography variant="span" letter="capitalize" className="">
                                            {t('order:credit')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {modules.giftcard.enabled && detail[0].detail[0] && detail[0].detail[0].aw_giftcard.giftcard_amount ? (
                                    <div className="">
                                        <Typography variant="span" letter="capitalize" className="">
                                            {t('order:giftcard')}
                                            {' '}
                                            (
                                            {detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code}
                                            )
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].applied_extra_fee ? (
                                    <div className="">
                                        <Typography variant="span" letter="capitalize" className="">
                                            {detail[0].detail[0].applied_extra_fee.title}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(
                                                detail[0].detail[0].applied_extra_fee.extrafee_value.value,
                                                detail[0].detail[0].applied_extra_fee.extrafee_value.currency,
                                                currencyCache,
                                            )}
                                        </Typography>
                                    </div>
                                ) : null}
                                <div className="">
                                    <Typography variant="title" type="bold" letter="capitalize" className="">
                                        Total
                                    </Typography>
                                    <Typography variant="title" type="bold" letter="capitalize">
                                        {detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency, currencyCache)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames('')}>
                    <div className="flex flex-row start-xs start-sm start-sm start-md start-lg">
                        <div className="xs:basis-full">
                            <Typography
                                variant="span"
                                letter="capitalize"
                                type="regular"
                                className={classNames('clear-margin-padding', '')}
                            >
                                {t('order:orderInfo')}
                            </Typography>
                            <hr />
                        </div>
                        {Object.keys(detail[0].detail[0].shipping_address).length > 0 && (
                        // shipped to block
                            <div className="xs:basis-full col-xs-print-4 sm:basis-4/12 md:basis-4/12">
                                <Typography variant="p" type="bold" letter="uppercase" className="">
                                    {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                        ? t('order:pickupAt')
                                        : t('order:shippedTo')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].shipping_address.firstname || ''}
                                    {' '}
                                    {detail[0].detail[0].shipping_address.lastname || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.street || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.city || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.region || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.country_id || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.telephone || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.postcode || ''}
                                </Typography>
                            </div>
                        )}
                        {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store && (
                        // pickup store
                            <div className="xs:basis-full col-xs-print-3 sm:basis-3/12 md:basis-3/12">
                                <Typography variant="p" type="bold" letter="uppercase" className="">
                                    {t('order:pickupBy')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].pickup_store.pickup_person.name}
                                    <br />
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {`Hp : ${detail[0].detail[0].pickup_store.pickup_person.handphone}`}
                                    <br />
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {`Email : ${detail[0].detail[0].pickup_store.pickup_person.email}`}
                                    <br />
                                </Typography>
                            </div>
                        )}
                        {/* orderstatus */}
                        {/* <div className="col-xs-3">
                    <Typography variant="p" type="bold" letter="uppercase" className={''}>
                        {t('order:orderStatus')}
                    </Typography>
                    <Typography variant="span" className="clear-margin-padding">
                        {detail[0].status_label || ''}
                    </Typography>
                </div> */}
                        {/* shipping method */}
                        {Object.keys(detail[0].detail[0].shipping_address).length > 0 && (
                            <div className="xs:basis-3/12 col-xs-print-3">
                                <Typography variant="p" type="bold" letter="uppercase" className="">
                                    {t('order:shippingMethod')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].shipping_methods.shipping_description || ''}
                                </Typography>
                            </div>
                        )}
                        {/* billing address */}
                        <div className="xs:basis-full col-xs-print-3 sm:basis-3/12 md:basis-3/12">
                            <Typography variant="p" type="bold" letter="uppercase" className="">
                                {t('order:billingAddress')}
                            </Typography>
                            <Typography variant="span" className="clear-margin-padding">
                                {detail[0].detail[0].billing_address.firstname || ''}
                                {' '}
                                {detail[0].detail[0].billing_address.lastname || ''}
                                <br />
                                {detail[0].detail[0].billing_address.street || ''}
                                <br />
                                {detail[0].detail[0].billing_address.city || ''}
                                <br />
                                {detail[0].detail[0].billing_address.region || ''}
                                <br />
                                {detail[0].detail[0].billing_address.country_id || ''}
                                <br />
                                {detail[0].detail[0].billing_address.telephone || ''}
                                <br />
                                {detail[0].detail[0].billing_address.postcode || ''}
                            </Typography>
                        </div>
                        <div className="xs:basis-full col-xs-print-2 sm:basis-2/12 md:basis-2/12">
                            <Typography variant="p" type="bold" letter="uppercase" className="">
                                {t('order:paymentMethod')}
                            </Typography>
                            {Object.keys(detail[0].detail[0].payment.payment_additional_info).map((item) => {
                                if (
                                    item !== '__typename'
                                    && detail[0].detail[0].payment.payment_additional_info[item] !== ''
                                    && detail[0].detail[0].payment.payment_additional_info[item] !== null
                                ) {
                                    return (
                                        <React.Fragment key={item}>
                                            <Typography variant="p" type="bold" letter="capitalize" className="">
                                                {item.replace('_', ' ')}
                                            </Typography>
                                            <Typography variant="span" className="clear-margin-padding">
                                                {detail[0].detail[0].payment.payment_additional_info[item] || ''}
                                            </Typography>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                .header-middle__logo-link {
                    cursor: pointer;
                    width: 120px;
                }
                .header-middle__left {
                    padding-bottom: 30px;
                }

                @media only print {
                    .col-xs-print-4 {
                        flex-basis: 33.333333%;
                        max-width: 33.333333%;
                    }
                    .col-xs-print-3 {
                        flex-basis: 25%;
                        max-width: 25%;
                    }
                    .col-xs-print-2 {
                        flex-basis: 16.666666%;
                        max-width: 16.666666%;
                    }
                }
            `}
            </style>
        </>
    );
};

export default PrintOrder;
