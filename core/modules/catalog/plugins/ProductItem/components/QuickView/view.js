import Dialog from '@common/Dialog';
import cx from 'classnames';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Typography from '@common_typography';
import RatingStar from '@common_ratingstar';
import OptionItem from '@core_modules/product/plugins/OptionItem';
import Divider from '@common/Divider';
import parse from 'html-react-parser';
import Button from '@common/Button';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import CompareIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon';
// import Banner from '@common_slick/BannerThumbnail';
import WeltpixelLabel from '../WeltpixelLabel';

const QuickView = (props) => {
    const {
        open, handleClose,
        generatePrice,
        // generateTiersPrice,
        price,
        priceData,
        product,
        t,
        dataPrice,
        setBanner,
        setPrice,
        setStockStatus,
        setAdditionalPrice,
        customizableOptions,
        setCustomizableOptions,
        errorCustomizableOptions,
        checkCustomizableOptionsValue,
        additionalPrice,
        setSpesificProduct,
        reviewValue,
        // banner,
        storeConfig,
        weltpixel_labels,
    } = props;

    const { short_description = '' } = product;

    let shortDescription = '';

    if (typeof short_description === 'string') {
        shortDescription = '';
    } else if (short_description) {
        shortDescription = short_description.html;
    }

    return (
        <Dialog
            open={open}
            content={(
                <div className={cx(
                    'w-full flex flex-col desktop:flex-row-reverse gap-2 !bg-[transparent]',
                )}
                >
                    <div className="w-full desktop:w-auto flex justify-end">
                        <div
                            role="presentation"
                            onClick={handleClose}
                            className={cx(
                                'w-7 h-7 p-1 rounded-md justify-center items-center gap-1.5 inline-flex group',
                                'bg-neutral-white bg-opacity-40 hover:bg-primary',
                                'cursor-pointer',
                            )}
                        >
                            <XMarkIcon className="w-5 h-5 relative group-hover:text-neutral-white" />
                        </div>
                    </div>
                    <div className={cx(
                        'w-full h-max max-h-[calc(100vh-60px)] p-8 bg-neutral-white rounded-lg',
                        'flex flex-col tablet:flex-row gap-4 tablet:gap-6',
                        'shadow-xl overflow-y-scroll',
                    )}
                    >
                        <div className="max-h-[50%] tablet:w-[296px] tablet:h-[296px] desktop:w-[400px] desktop:h-[400px]">
                            {storeConfig?.pwa?.label_enable && storeConfig?.pwa?.label_weltpixel_enable && (
                                <WeltpixelLabel t={t} weltpixel_labels={weltpixel_labels} categoryLabel={false} />
                            )}
                            <div className="w-[296px] h-[296px]" />
                            {/* <Banner
                                data={banner}
                                noLink
                                thumbnail
                                showArrow
                                autoPlay={false}
                                width={400}
                                height={400}
                                // customClassCaraousel={styles.caraousel}
                                storeConfig={storeConfig}
                            /> */}
                        </div>
                        <div className={cx(
                            'flex flex-col gap-4 tablet:gap-5',
                            'w-max desktop:min-w-[450px]',
                        )}
                        >
                            <div className={cx(
                                'flex flex-col gap-2',
                            )}
                            >
                                {
                                    product.seller && (

                                        <Typography color="text-primary">{product.seller.seller_name}</Typography>
                                    )
                                }
                                <Typography classNam="line-clamp-2" variant="h2" color="text-neutral-800">
                                    {product?.name || ''}
                                </Typography>
                                {// eslint-disable-next-line no-underscore-dangle
                                    product.__typename !== 'AwGiftCardProduct' && generatePrice(priceData, price)
                                }
                                <div className="flex flex-row gap-2 items-center">
                                    <RatingStar value={reviewValue || 0} />
                                    <Typography color="text-neutral-500" className="font-normal" variant="p" type="regular" letter="capitalize">
                                        {`(${product.review.reviews_count || 0} ${t('product:review')})`}
                                    </Typography>
                                </div>
                            </div>
                            <div className="py-1">
                                <Divider />
                            </div>
                            <div className="flex flex-col gap-4">
                                <OptionItem
                                    price={price}
                                    t={t}
                                    data={product}
                                    dataPrice={dataPrice}
                                    priceData={priceData}
                                    setBanner={setBanner}
                                    setPrice={setPrice}
                                    setStockStatus={setStockStatus}
                                    setAdditionalPrice={setAdditionalPrice}
                                    customizableOptions={customizableOptions}
                                    setCustomizableOptions={setCustomizableOptions}
                                    errorCustomizableOptions={errorCustomizableOptions}
                                    checkCustomizableOptionsValue={checkCustomizableOptionsValue}
                                    additionalPrice={additionalPrice}
                                    handleSelecteProduct={setSpesificProduct}
                                    showAddToCart
                                    showQty
                                    labelAddToCart={t('common:button:addToCart')}
                                    showWishlist={false}
                                    enableProductCompare={false}
                                    enableBundle={false}
                                    enableDownload={false}
                                    showStockStatus
                                    stockStatus={product?.stock_status || ''}
                                    storeConfig={storeConfig}
                                />
                            </div>
                            {
                                shortDescription && (

                                    <div className="hidden tablet:flex line-clamp-2 text-md text-neutral-500 leading-5">
                                        {parse(shortDescription)}
                                    </div>
                                )
                            }

                            <div className="py-1">
                                <Divider />
                            </div>
                            <div className="flex flex-col desktop:flex-row justify-between items-start desktop:items-center">
                                <div className="flex flex-row pl-1">
                                    Share :
                                </div>
                                <div className="inline-flex gap-2">
                                    <Button
                                        icon={<HeartIcon />}
                                        iconPosition="right"
                                        variant="plain"
                                        className="!p-1"
                                    >
                                        {t('catalog:button:addToWishlist')}
                                    </Button>
                                    <Button
                                        icon={<CompareIcon />}
                                        iconPosition="right"
                                        variant="plain"
                                        className="!p-1"
                                    >
                                        {t('catalog:button:addToCompare')}
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            classContainer="!shadow-none tablet:!max-w-[700px] desktop:!max-w-[945px]"
            classContent="!p-0 !bg-[transparent]"
        />
    );
};

export default QuickView;
