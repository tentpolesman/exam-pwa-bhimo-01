/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import Typography from '@common_typography';
import Show from '@common_show';
import Divider from '@common_divider';
import Share from '@common_share';
import Button from '@common_button';
import GeneratePrice from '@core_modules/product/pages/default/components/GeneratePrice';
import ReviewList from '@core_modules/product/pages/default/components/ReviewList';
import Dialog from '@common_dialog';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import ProductRelated from '@core_modules/product/pages/default/components/ProductRelated';
import ProductUpsell from '@core_modules/product/pages/default/components/ProductUpsell';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { HeartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const ImageSlider = dynamic(() => import('@common_imageslider'), { ssr: true });
const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: true });
const ProductTabs = dynamic(() => import('@core_modules/product/pages/default/components/ProductTabs'), { ssr: false });
const ProductTabsAccordion = dynamic(() => import('@core_modules/product/pages/default/components/ProductTabsAccordion'), { ssr: false });
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
    useShareProduct,
    useProductRelated,
    useProductUpsell,
    setStockStatus,
    setAdditionalPrice,
    setBanner,
    showShortDesc,
    setShowShortDesc,
    reviewRef,
    isMobile,
    classContainer,
    classContentWrapper,
    imageSliderProps = {},
    classImageSliderWrapper,
    handleOption,
    setPrice,
    currencyCode,
    currencyCache,
    openOption,
    setOpenOption,
}) => (
    <div className="plugin-product-detail-action desktop:px-[0px] tablet:px-[16px]">
        <div className={cx(
            'product-detail-container',
            'desktop:grid tablet:grid desktop:grid-cols-2 tablet:grid-cols-2',
            'mt-[32px]',
            classContainer,
        )}
        >
            <div className={cx(
                'product-detail-slider',
                classImageSliderWrapper,
            )}
            >
                <ImageSlider
                    useZoom={false}
                    data={banner}
                    storeConfig={storeConfig}
                    onClickZoomImage={useProductImagePreview && enablePopupImage ? handleOpenImageDetail : null}
                    {...imageSliderProps}
                />
            </div>
            <div className={cx(
                'product-detail-info',
                'desktop:pl-[35px]',
                'desktop:ml-[48px] tablet:ml-[12px]',
                'desktop:px-[0px] tablet:px-[0px] mobile:px-[16px]',
                'desktop:flex tablet:flex desktop:flex-col tablet:flex-col',
                'items-start',
                classContentWrapper,
            )}
            >
                <Typography variant="h1" className="first-letter:uppercase mb-[12px] desktop:mt-[0px] tablet:mt-[0px] mobile:mt-[24px]">
                    {data?.name || '-'}
                </Typography>
                <Show when={!isAwGiftCard && !loadPrice}>
                    <div className={
                        cx(
                            'product-detail-info-price-container',
                            isMobile && 'flex justify-between',
                        )
                    }
                    >
                        <div className="product-detail-info-price-left">
                            <GeneratePrice
                                additionalPrice={additionalPrice}
                                spesificProduct={spesificProduct}
                                errorPrice={errorPrice}
                                loadPrice={loadPrice}
                                priceDataItem={priceData}
                                priceItem={price}
                            />
                        </div>

                        {/* SHARE, WISHLIST, COMPARE MOBILE */}
                        <Show when={isMobile}>
                            <div className={cx(
                                'product-detail-info-price-right',
                                'flex items-center gap-1.5',
                            )}
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
                                            <HeartIcon className="h-[20px] w-[20px]" />
                                        </Typography>
                                    </Button>
                                </Show>
                                <Show when={enableProductCompare}>
                                    <Button
                                        variant="plain"
                                        icon={false}
                                        iconOnly={false}
                                        onClick={() => handleSetCompareList(data?.id)}
                                        className="!p-0 whitespace-nowrap"
                                    >
                                        <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                            <ArrowsRightLeftIcon className="h-[20px] w-[20px]" />
                                        </Typography>
                                    </Button>
                                </Show>
                                <Share />
                            </div>
                        </Show>
                    </div>
                </Show>
                <Button
                    variant="plain"
                    className="!p-0 flex items-center"
                    onClick={() => {
                        reviewRef?.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="flex mt-[12px]">
                        <RatingStar value={reviewValue || 0} />
                        <Typography variant="p-2" className="ml-[4px]">
                            {`(${data.review.reviews_count || 0} ${t('product:review')})`}
                        </Typography>
                    </div>
                </Button>
                <Divider className="my-[24px]" />
                <CustomizableOption
                    showCustomizableOption={false}
                />
                <div className="flex flex-col gap-4 w-[100%]">
                    <OptionItem
                        price={price}
                        t={t}
                        dataPrice={dataPrice}
                        priceData={priceData}
                        setStockStatus={setStockStatus}
                        setAdditionalPrice={setAdditionalPrice}
                        customizableOptions={customizableOptions}
                        setCustomizableOptions={setCustomizableOptions}
                        errorCustomizableOptions={errorCustomizableOptions}
                        checkCustomizableOptionsValue={checkCustomizableOptionsValue}
                        additionalPrice={additionalPrice}
                        handleSelecteProduct={setSpesificProduct}
                        showAddToCart
                        labelAddToCart={t('common:button:addToCart')}
                        setBanner={setBanner}
                        showWishlist={false}
                        enableProductCompare={false}
                        showStockStatus
                        stockStatus={data?.stock_status || ''}
                        storeConfig={storeConfig}
                        handleOption={handleOption}
                        setPrice={setPrice}
                        currencyCode={currencyCode}
                        currencyCache={currencyCache}
                        openOption={openOption}
                        setOpenOption={setOpenOption}
                        data={{
                            ...data,
                            url_key: slug,
                            review: data?.review,
                        }}
                    />
                </div>
                <div className="product-detail-description-container">
                    <div className="product-detail-description relative">
                        <Typography
                            variant="p-2"
                            className={
                                cx(
                                    'mt-[24px]',
                                    showShortDesc && 'h-auto',
                                    !showShortDesc && 'desktop:h-[120px] tablet:h-[80px] mobile:h-[80px] overflow-hidden',
                                )
                            }
                        >
                            {data?.short_description?.html ? <CmsRenderer content={data?.short_description?.html} /> : null}
                        </Typography>
                        <Show when={!showShortDesc && data?.short_description?.html?.length > 0}>
                            <div
                                className="w-[100%] h-[25px] absolute bottom-[0px]"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7497373949579832) 43%, rgba(255,255,255,0) 100%)',
                                }}
                            />
                        </Show>
                    </div>
                    <Show when={data?.short_description?.html?.length > 0}>
                        <Button
                            variant="plain"
                            onClick={() => setShowShortDesc(!showShortDesc)}
                            className="!p-0 mt-[6px]"
                        >
                            <Typography variant="bd-2a">
                                {showShortDesc ? `- ${t('common:label:showLess')}` : `+ ${t('common:label:showMore')}`}
                            </Typography>
                        </Button>
                    </Show>
                </div>
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
                    <Show when={useShareProduct}>
                        <div className={cx('porudct-detail-info-footer-share')}>
                            <Share />
                        </div>
                    </Show>
                    {/* WISHLIST & COMPARE DESKTOP, TABLET */}
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

        <Show when={!isMobile && useProductTabs}>
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
                    tabContentClassName="mt-[24px]"
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

        <Show when={isMobile && useProductTabs}>
            <ProductTabsAccordion
                data={expandData}
                smartProductTabs={
                    smartProductTabs || {
                        tab_2: {
                            label: null,
                            content: null,
                        },
                    }
                }
            />
        </Show>

        <Show when={useReviewList}>
            <div
                ref={reviewRef}
                className={cx(
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
        <Show when={useProductRelated}>
            <ProductRelated
                t={t}
                dataProduct={data}
                isLogin={isLogin}
                storeConfig={storeConfig}
            />
        </Show>
        <Show when={useProductUpsell}>
            <ProductUpsell
                t={t}
                dataProduct={data}
                isLogin={isLogin}
                storeConfig={storeConfig}
            />
        </Show>
    </div>
);

export default ProductDetailAction;
