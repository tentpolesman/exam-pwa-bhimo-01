/* eslint-disable operator-linebreak */
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList } from '@core_modules/cms/services/graphql';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import ProductItem from '@plugin_productitem';
import ContainerScroll from '@common/ContainerScroll';
import cx from 'classnames';
import { generateGridItemClass } from '@helpers/style';

const Product = (props) => {
    const {
        type,
        condition,
        max_items,
        orer_by,
        product_addtocart,
        product_shortdescription,
        product_compare,
        product_image,
        product_name,
        product_price,
        product_review,
        product_swatches,
        product_wishlist,
        product_sku,
        product_display,
        owl_item_xl, // slider
        owl_item_lg,
        owl_item_md,
        owl_item_sm,
        owl_item_xs,
        item_xl, // grid
        item_lg,
        item_md,
        item_sm,
        item_xs,
        owl_nav_position,
    } = props;
    const { storeConfig } = props;
    const { t } = useTranslation(['common', 'catalog']);

    const productProps = {
        storeConfig,
        enableQuickView: false,
        enableImage: product_image,
        enableAddToCart: product_addtocart,
        enableOption: product_swatches,
        enableWishlist: product_wishlist,
        enableProductCompare: product_compare,
        enableShortDescription: product_shortdescription,
        enablePrice: product_price,
        enableRating: product_review,
        enableProductName: product_name,
    };
    const productGridProps = {
        className: cx('carousel-item', 'basis-[256px]', 'flex-shrink-0', {
            [`${generateGridItemClass(owl_item_xl || item_xl, 'xl')}`]: owl_item_xl || item_xl,
            [`${generateGridItemClass(owl_item_lg || item_lg, 'lg')}`]: owl_item_lg || item_lg,
            [`${generateGridItemClass(owl_item_md || item_md, 'md')}`]: owl_item_md || item_md,
            [`${generateGridItemClass(owl_item_sm || item_sm, 'sm')}`]: owl_item_sm || item_sm,
            [`${generateGridItemClass(owl_item_xs || item_xs, 'xs')}`]: owl_item_xs || item_xs,
        }),
    };

    let content = '';
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(type, type === 'single_product' ? { sku: { eq: product_sku } } : dataCondition, orer_by);
    const [fetchProductList, { data, loading, error }] = getProductList();

    useEffect(() => {
        fetchProductList({
            variables: { ...dataFilter, pageSize: max_items },
        });
    }, []);

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: t('catalog:emptyProductSearchResult'),
                variant: 'error',
                position: 'bottom-right',
            });
        }
    }, [error]);

    useEffect(() => {
        if (loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loading]);

    if (type === 'single_product' && data?.products?.items) {
        content = data?.products?.items[0] && (
            <ProductItem
                {...data.products.items[0]}
                {...productProps}
                isGrid={product_display === 'grid'}
                className={cx({
                    '!max-w-[288px]': product_display === 'grid',
                })}
            />
        );
    }

    if (type === 'product_list' && data?.products?.items) {
        content = data?.products?.items.map((product, index) => (
            <ProductItem
                //
                key={index}
                isGrid={false}
                {...product}
                {...productProps}
                {...productGridProps}
            />
        ));
    }

    if (type === 'product_grid' && data?.products?.items) {
        content = (
            <div className="flex gap-4 flex-wrap">
                {data?.products?.items.map((product, index) => (
                    <ProductItem
                        //
                        key={index}
                        {...product}
                        {...productProps}
                        {...productGridProps}
                    />
                ))}
            </div>
        );
    }

    if (type === 'product_slider' && data?.products?.items) {
        content = (
            <ContainerScroll
                showArrow
                arrowProps={{
                    className: cx('!opacity-100', '!px-0', {
                        '!static transform-none': owl_nav_position !== 'center_split',
                        '!mb-1': owl_nav_position.indexOf('top') !== -1,
                        '!mt-1 !order-3': owl_nav_position.indexOf('bottom') !== -1,
                        '!justify-start': owl_nav_position.indexOf('left') !== -1,
                        '!justify-end': owl_nav_position.indexOf('right') !== -1,
                        '!justify-center': owl_nav_position === 'bottom_center',
                    }),
                    rightNavClassName: '!ml-1',
                    leftNavClassName: '!mr-1',
                }}
                className="!gap-4"
            >
                {data?.products?.items.map((product, index) => (
                    <ProductItem
                        //
                        key={index}
                        {...product}
                        {...productProps}
                        {...productGridProps}
                    />
                ))}
            </ContainerScroll>
        );
    }

    return (
        <>
            <div className="mgz-product-content">{!loading && !error ? content : null}</div>
            <style jsx>
                {`
                    .mgz-product-content :global(.carousel-item) {
                        overflow: unset;
                    }
                `}
            </style>
        </>
    );
};
export default Product;
