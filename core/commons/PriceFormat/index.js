/* eslint-disable camelcase */
import React from 'react';
import BundleProductTypePrice from '@common_priceformat/BundleProductTypePrice';
import ProductTypePrice from '@common_priceformat/ProductTypePrice';
import { useReactiveVar } from '@apollo/client';
import { currencyVar } from '@root/core/services/graphql/cache';
import { useTranslation } from 'next-i18next';

/**
 * Price Generator Component
 * @component
 * @param {array} priceRange - price range from magento GQL including regluar price and final price
 * @returns {object} [priceTiers] - tier prices from magento GQL
 */

const PriceFormat = ({
    priceRange = {},
    priceTiers = [],
    productType = 'SimpleProduct',
    isPdp = false,
    isQuickView = false,
    ...other
}) => {
    const { t } = useTranslation(['common']);
    const currencyCache = useReactiveVar(currencyVar);

    if (!priceRange) {
        return <div className="price-format-invalid">{t('common:label:invalidPrice')}</div>;
    }

    if (productType === 'BundleProduct' || productType === 'AwGiftCardProduct') {
        return (
            <BundleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
                currencyCache={currencyCache}
                {...other}
            />
        );
    }

    return (
        <ProductTypePrice
            productType={productType}
            priceRange={priceRange}
            priceTiers={priceTiers}
            currencyCache={currencyCache}
            isPdp={isPdp}
            isQuickView={isQuickView}
            {...other}
        />
    );
};

export default PriceFormat;
