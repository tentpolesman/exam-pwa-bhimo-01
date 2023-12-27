/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable radix */
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import Image from '@common_image';

const ItemProduct = ({
    name, price_incl_tax, row_total_incl_tax, qty_ordered, currency, t,
    image_url, storeConfig,
}) => {
    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <div className="">
            <div className="">
                <Image
                    src={image_url}
                    className=""
                    alt={name}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                    storeConfig={storeConfig}
                />
            </div>
            <div className="">
                <Typography variant="label" className="clear-margin-padding">{name || ''}</Typography>
                <Typography variant="span" className="">
                    {t('common:title:price')}
                    {' '}
                    :
                    {formatPrice(price_incl_tax, currency)}
                </Typography>
                <Typography variant="span" className="">
                    {t('common:title:qty')}
                    {' '}
                    :
                    {qty_ordered || 0}
                </Typography>
                <Typography variant="span" className="">
                    {t('common:subtotal')}
                    {' '}
                    :
                    {formatPrice(row_total_incl_tax, currency)}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProduct;
