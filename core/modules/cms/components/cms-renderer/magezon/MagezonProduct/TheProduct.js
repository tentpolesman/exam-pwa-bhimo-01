/* eslint-disable operator-linebreak */
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList, getProductPrice } from '@core_modules/cms/services/graphql';
import { useTranslation } from 'next-i18next';
import Grid from '@material-ui/core/Grid';
// import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { priceVar } from '@root/core/services/graphql/cache';
import { useReactiveVar } from '@apollo/client';
import dynamic from 'next/dynamic';

const Skeleton = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Skeleton'));
const ProductSlider = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Slider'));
const SingleProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/SingleProduct'));
const ErrorMessage = dynamic(() => import('@plugin_productlist/components/ErrorMessage'));

const TheProduct = (props) => {
    // prettier-ignore
    const {
        type, condition, border_hover_color,
        description, show_line,
        line_color, line_position, line_width,
        max_items, orer_by, product_addtocart, product_shortdescription,
        product_compare, product_image, product_name,
        product_price, product_review, product_swatches, product_wishlist, product_sku, product_display,
        title, title_align, title_tag, title_color,
        item_xl, item_lg, item_md, item_sm, item_xs,
        ...rest
    } = props;
    const { storeConfig } = props;
    const { t } = useTranslation(['common', 'catalog']);

    const productProps = {
        type,
        product_addtocart,
        product_compare,
        product_image,
        product_price,
        product_review,
        product_swatches,
        product_wishlist,
        product_name,
        product_shortdescription,
        product_display,
        item_xl,
        item_lg,
        item_md,
        item_sm,
        item_xs,
        storeConfig,
    };
    const router = useRouter();
    let content = '';
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(type, type === 'single_product' ? { sku: { eq: product_sku } } : dataCondition, orer_by);
    // const context = type !== 'single_product' && dataFilter.sort.random ? { request: 'internal' } : {};
    const [fetchProductList, { data, loading, error }] = getProductList();
    const [fetchProductPrice, { data: dataPrice, loading: loadingPrice, error: errorPrice }] = getProductPrice();
    // cache price
    const cachePrice = useReactiveVar(priceVar);
    const magezonProductRef = useRef();
    const [display, setDisplay] = useState(false);

    const generateIdentifier = () => {
        let identifier = `${router.asPath}-${title}`;
        identifier = identifier.replace(/ /g, '-');
        return identifier;
    };

    React.useEffect(() => {
        fetchProductList({
            variables: { ...dataFilter, pageSize: max_items },
        });
    }, []);

    React.useEffect(() => {
        if (!cachePrice[generateIdentifier()]) {
            fetchProductPrice({
                variables: { ...dataFilter, pageSize: max_items },
            });
        }
    }, [data]);

    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier();
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries?.length > 0 && entries[0].isIntersecting && !display) {
                setDisplay(true);
            }
        });

        if (magezonProductRef.current) {
            observer.observe(magezonProductRef.current);
        }

        return () => observer.disconnect();
    }, [magezonProductRef]);

    const getPrice = () => {
        let productPrice = [];

        if (cachePrice[generateIdentifier()] && cachePrice[generateIdentifier()].products && cachePrice[generateIdentifier()].products.items) {
            productPrice = cachePrice[generateIdentifier()].products.items;
        } else if (dataPrice && dataPrice.products && dataPrice.products.items) {
            productPrice = dataPrice.products.items;
        }

        return productPrice;
    };

    if (type === 'single_product' && data && data.products && data.products.items) {
        content = data?.products?.items[0] && (
            <SingleProduct
                product={data.products.items[0]}
                {...productProps}
                dataPrice={getPrice()}
                loadingPrice={loadingPrice}
                errorPrice={errorPrice}
            />
        );
    }

    if (type === 'product_list' && data && data.products && data.products.items) {
        content = data?.products?.items.map((product, index) => (
            <SingleProduct
                key={index}
                product={product}
                {...productProps}
                dataPrice={getPrice()}
                loadingPrice={loadingPrice}
                errorPrice={errorPrice}
            />
        ));
    }

    if (type === 'product_grid' && data && data.products && data.products.items) {
        content = (
            <Grid container>
                {data?.products?.items.map((product, index) => (
                    <SingleProduct
                        key={index}
                        product={product}
                        {...productProps}
                        dataPrice={getPrice()}
                        loadingPrice={loadingPrice}
                        errorPrice={errorPrice}
                    />
                ))}
            </Grid>
        );
    }

    if (type === 'product_slider' && data && data.products && data.products.items) {
        content = (
            <ProductSlider {...rest}>
                {data?.products?.items.map((product, index) => (
                    <SingleProduct key={index} product={product} {...productProps} dataPrice={getPrice()} />
                ))}
            </ProductSlider>
        );
    }

    return (
        <>
            <div className="mgz-product-content">{loading ? <Skeleton /> : content}</div>
            {error && (
                <>
                    <div className="mgz-product-error">
                        <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />
                    </div>
                </>
            )}
            <style jsx>
                {`
                    .mgz-product-content > :global(div) {
                        margin-bottom: 20px;
                    }
                    .mgz-product-content > :global(div:hover) {
                        ${type !== 'product_grid' &&
                        type !== 'product_slider' &&
                        `
                            box-shadow: 0px 20px 50px -20px rgb(0 0 0 / 50%) !important;
                            border: 1px solid ${border_hover_color || '#ffffff'} !important;
                        `}
                    }
                    .mgz-product-content :global(.mgz-single-product-card) {
                        padding: 20px 0;
                    }
                    .mgz-product-content :global(.mgz-single-product-card img) {
                        max-width: 100%;
                        cursor: pointer;
                    }
                    .mgz-product-error {
                        padding: 20px 0;
                    }
                `}
            </style>
        </>
    );
};
export default TheProduct;
