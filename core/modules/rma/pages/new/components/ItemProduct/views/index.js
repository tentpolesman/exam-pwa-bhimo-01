/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable radix */
import Typography from '@common_typography';
import React from 'react';
import CheckBox from '@common_forms/CheckBox';
import Image from '@common_image';
import { formatPrice } from '@helper_currency';

const ItemProductView = (props) => {
    const {
        checked, disabled, handleChange, name,
        image_url, price_incl_tax, currency, storeConfig = {},
    } = props;

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <div class="rma-container">
            <CheckBox checked={checked} disabled={disabled} onChange={handleChange} inputProps={{ 'aria-label': name }} />
            <div className="rma-container-image">
                <Image
                    src={image_url}
                    alt={name}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                    storeConfig={storeConfig}
                />
            </div>
            <div className="rm-container-label">
                <Typography className="font-semibold">
                    {name || ''}
                </Typography>
                <Typography variant="span">{formatPrice(price_incl_tax, currency)}</Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProductView;
