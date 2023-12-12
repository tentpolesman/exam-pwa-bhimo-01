import Typography from '@common_typography';
import ImageSlider from '@common_imageslider';
import Show from '@common_show';
import Divider from '@common_divider';
import Share from '@common_share';
import Button from '@common_button';
import GeneratePrice from '@core_modules/product/pages/default/components/GeneratePrice';
import ReviewList from '@core_modules/product/pages/default/components/ReviewList';
import Dialog from '@common_dialog';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import ProductRelated from '@core_modules/product/pages/default/components/ProductRelated';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { HeartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: true });
const ProductTabs = dynamic(() => import('@core_modules/product/pages/default/components/ProductTabs'), { ssr: false });
const CustomizableOption = dynamic(() => import('@plugin_customizableitem'));
const OptionItem = dynamic(() => import('@plugin_optionitem'), { ssr: true });

const ProductDetailAction = ({
    t,
    slug,
    data,
    isLogin,
    banner,
    reviewValue,
    storeConfig,
    enablePopupImage,
    handleOpenImageDetail,
    isAwGiftCard,
    price,
    priceData,
    loadPrice,
    errorPrice,
    additionalPrice,
    spesificProduct,
    setSpesificProduct,
    dataPrice,
    checkCustomizableOptionsValue,
    customizableOptions,
    setCustomizableOptions,
    errorCustomizableOptions,
    handleWishlist,
    handleSetCompareList,
    expandData,
    openImageDetail,
    enableProductCompare,
    enableWishlist,
    smartProductTabs,
    useReviewList,
    useProductTabs,
    useProductImagePreview,
    handleOption,
    openOption,
    setOpenOption,
    stockStatus,
    setStockStatus,
}) => (
    <div className="plugin-product-detail-action desktop:px-[0px] tablet:px-[16px]">
        <div className={cx('product-detail-container', 'desktop:grid tablet:grid desktop:grid-cols-2 tablet:grid-cols-2', 'mt-[32px]')}>
            <div className={cx('product-detail-slider')}>
                <ImageSlider
                    useZoom={false}
                    data={banner}
                    storeConfig={storeConfig}
                    onClickZoomImage={useProductImagePreview && enablePopupImage ? handleOpenImageDetail : null}
                />
            </div>
            <div className={cx(
                'product-detail-info',
                'desktop:pl-[35px]',
                'desktop:ml-[48px] tablet:ml-[12px]',
                'desktop:px-[0px] tablet:px-[0px] mobile:px-[16px]',
                'desktop:flex tablet:flex desktop:flex-col tablet:flex-col',
                'grap-[24px]',
                'items-start',
            )}
            >
                <Typography variant="h1" className="first-letter:uppercase mb-[12px] desktop:mt-[0px] tablet:mt-[0px] mobile:mt-[24px]">
                    {data?.name || '-'}
                </Typography>
                <Show when={!isAwGiftCard && !loadPrice}>
                    <GeneratePrice
                        additionalPrice={additionalPrice}
                        spesificProduct={spesificProduct}
                        errorPrice={errorPrice}
                        loadPrice={loadPrice}
                        priceDataItem={priceData}
                        priceItem={price}
                    />
                </Show>
                <div className="flex mt-[12px]">
                    <RatingStar value={reviewValue || 0} />
                    <Typography variant="p-2" className="ml-[4px]">
                        {`(${data.review.reviews_count || 0} ${t('product:review')})`}
                    </Typography>
                </div>
                <Divider className="my-[24px]" />
                <CustomizableOption
                    showCustomizableOption={false}
                />
                <OptionItem
                    t={t}
                    dataPrice={dataPrice}
                    handleSelecteProduct={setSpesificProduct}
                    showQty
                    showAddToCart
                    showStockStatus={data?.stock_status}
                    labelAddToCart={t('common:button:addToCart')}
                    isGrid={false}
                    customizableOptions={customizableOptions}
                    setCustomizableOptions={setCustomizableOptions}
                    errorCustomizableOptions={errorCustomizableOptions}
                    checkCustomizableOptionsValue={checkCustomizableOptionsValue}
                    showWishlist={false}
                    enableProductCompare={enableProductCompare}
                    enableBundle={false}
                    enableDownload={false}
                    handleOption={handleOption}
                    openOption={openOption}
                    setOpenOption={setOpenOption}
                    stockStatus={stockStatus}
                    setStockStatus={setStockStatus}
                    data={{
                        ...data,
                        url_key: slug,
                        review: data?.review,
                    }}
                    propsItem={{
                        className: 'w-5 h-5',
                    }}
                />
                <Typography variant="p-2" className="mt-[24px]">
                    {data?.short_description?.html ? <CmsRenderer content={data?.short_description?.html} /> : null}
                </Typography>
                <Divider className="my-[24px]" />
                <div className={
                    cx(
                        'product-detail-info-footer-container',
                        'desktop:flex desktop:justify-between',
                        'desktop:block tablet:block mobile:hidden',
                        'w-[100%]',
                    )
                }
                >
                    <div className={cx('porudct-detail-info-footer-share')}>
                        <Share instagram={false} />
                    </div>
                    <div className={
                        cx(
                            'product-detail-info-footer-action',
                            'flex desktop:justify-end tablet:justify-start',
                            'desktop:mt-[0px] tablet:mt-[16px]',
                        )
                    }
                    >
                        <Show when={enableWishlist}>
                            <Button
                                variant="plain"
                                icon={false}
                                iconOnly={false}
                                onClick={handleWishlist}
                                className="!p-0 whitespace-nowrap"
                            >
                                <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                    {t('common:label:addToWishlist')}
                                    <HeartIcon className="h-[14px] w-[14px] ml-[6px]" />
                                </Typography>
                            </Button>
                        </Show>
                        <Show when={enableProductCompare}>
                            <Button
                                variant="plain"
                                icon={false}
                                iconOnly={false}
                                onClick={() => handleSetCompareList(data?.id)}
                                className="!p-0 whitespace-nowrap ml-[12px]"
                            >
                                <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                    {t('common:label:addToCompare')}
                                    <ArrowsRightLeftIcon className="h-[14px] w-[14px] ml-[6px]" />
                                </Typography>
                            </Button>
                        </Show>
                    </div>
                </div>
            </div>
        </div>

        <Show when={useProductTabs}>
            <div
                className={cx(
                    'product-detail-tabs',
                    'desktop:mt-[64px] tablet:mt-[64px]',
                    'desktop:px-[0px] tablet:px-[0px] mobile:px-[16px]',
                )}
            >
                <ProductTabs
                    data={expandData}
                    tabHasContentClass="pt-[24px]"
                    smartProductTabs={
                        smartProductTabs || {
                            tab_2: {
                                label: null,
                                content: null,
                            },
                        }
                    }
                />
            </div>
        </Show>

        <Show when={useReviewList}>
            <div className={cx(
                'product-list-review-container',
                'mt-[48px]',
                'desktop:px-[0px] tablet:px-[0px] mobile:px-[16px]',
            )}
            >
                <ReviewList
                    t={t}
                    data={data}
                    storeConfig={storeConfig}
                    isLogin={isLogin}
                />
            </div>
        </Show>

        <Show when={useProductImagePreview && enablePopupImage}>
            <Dialog
                useCloseButton
                open={openImageDetail}
                variant="plain"
                classWrapper="!bg-opacity-100 bg-neutral-white"
                onClickClose={handleOpenImageDetail}
            >
                <ImageSlider
                    horizontalThumbnail
                    openImageDetail
                    detectAutoScreen={false}
                    data={banner}
                    storeConfig={storeConfig}
                />
            </Dialog>
        </Show>
        <ProductRelated t={t} dataProduct={data} isLogin={isLogin} storeConfig={storeConfig} />
    </div>
);

export default ProductDetailAction;
