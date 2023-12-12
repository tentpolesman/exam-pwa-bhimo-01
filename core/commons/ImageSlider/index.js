/* eslint-disable max-len */
import cx from 'classnames';
import Image from '@common_image';
import Show from '@common_show';
import Button from '@common_button';
import ContainerScroll from '@common_containerscroll';
import useMediaQuery from '@hook/useMediaQuery';
import { ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { imageSize } from '@root/swift.config.js';

const ImageSlider = ({
    data,
    storeConfig,
    onClickZoomImage,
    detectAutoScreen = true,
    horizontalThumbnail,
    verticalThumbnail,
}) => {
    const [imagePreview, setImagePreview] = React.useState(null);
    const [indexActive, setIndexActive] = React.useState(0);
    const [showArrow, setShowArrow] = React.useState(false);
    const { isDesktop, isMobile, screen } = useMediaQuery();

    const thumbnailImage = imageSize.thumbnail[screen];
    const mainImage = imageSize.main[screen];

    const onSelectedImage = ({ index, item }) => {
        setIndexActive(index);
        setImagePreview(item);
    };

    const onClickImagePreviewArrowRight = () => {
        const indexActiveIncrements = indexActive === (data?.length - 1) ? (data?.length - 1) : indexActive + 1;
        setIndexActive(indexActiveIncrements);
        setImagePreview(data[indexActiveIncrements]);
    };

    const onClickImagePreviewArrowLeft = () => {
        const indexActiveIncrements = indexActive < 1 ? 0 : indexActive - 1;
        setIndexActive(indexActiveIncrements);
        setImagePreview(data[indexActiveIncrements]);
    };

    React.useEffect(() => {
        if (data && data?.length > 0) {
            setImagePreview(data[indexActive]);
        }
    }, []);

    return (
        <div className={cx('image-slider', detectAutoScreen && isDesktop && 'inline-flex', detectAutoScreen && !isDesktop && 'flex flex-col')}>
            <Show when={(detectAutoScreen && isDesktop) || verticalThumbnail}>
                <ContainerScroll
                    variant="vertical"
                    maxHeight={mainImage}
                    style={{ width: thumbnailImage }}
                    className={cx('image-slider-vertical', 'px-[0px]')}
                >
                    {
                        data && data?.map((item, index) => {
                            const isActive = indexActive === index;
                            return (
                                <div
                                    className="mb-[12px]"
                                    key={`image-slider-vertical-${index}`}
                                >
                                    <Image
                                        storeConfig={storeConfig}
                                        className={cx(
                                            isActive && 'border-[1px] border-neutral-500',
                                            'w-full h-full',
                                            'p-[3px]',
                                            'rounded-[10px]',
                                            'cursor-pointer',
                                        )}
                                        src={item?.imageUrl}
                                        alt={item?.imageAlt ?? `slider image ${index}`}
                                        width={thumbnailImage}
                                        height={thumbnailImage}
                                        quality={80}
                                        widthMobile={thumbnailImage}
                                        heightMobile={thumbnailImage}
                                        onClick={() => onSelectedImage({ index, item })}
                                    />
                                </div>
                            );
                        })
                    }
                </ContainerScroll>
            </Show>
            <Show when={imagePreview}>
                <div
                    style={{
                        width: mainImage,
                        height: mainImage,
                    }}
                    className={
                        cx(
                            'image-slider-preview',
                            detectAutoScreen && 'tablet:mr-auto tablet:ml-[0px] mobile:mx-auto',
                            !detectAutoScreen && 'mx-auto',
                            'relative',
                            isDesktop && 'pl-[24px]',
                        )
                    }
                >
                    <div
                        onMouseEnter={() => setShowArrow(true)}
                        onMouseLeave={() => setShowArrow(false)}
                        style={{
                            width: mainImage,
                        }}
                        className={cx(
                            'container-image-slider-parent',
                            'relative',
                        )}
                    >
                        <Image
                            storeConfig={storeConfig}
                            className={
                                cx('w-full h-full', 'rounded-[12px]')
                            }
                            styleContainer={{
                                width: mainImage,
                                height: mainImage,
                            }}
                            src={imagePreview?.imageUrl}
                            alt={imagePreview?.imageAlt ?? 'slider image preview'}
                            width={mainImage}
                            height={mainImage}
                            quality={80}
                            widthMobile={100}
                            heightMobile={100}
                        />
                        <Show when={showArrow}>
                            <div
                                style={{ zIndex: 999 }}
                                className={cx(
                                    'container-scroll-arrow flex justify-between w-[100%]',
                                    'px-[13px]',
                                    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                                )}
                            >
                                <Button
                                    variant="tertiary"
                                    className="container-scroll-arrow-left !px-[10px]"
                                    onClick={onClickImagePreviewArrowLeft}
                                >
                                    <ChevronLeftIcon style={{ width: 20, height: 20 }} />
                                </Button>
                                <Button variant="tertiary" className="container-scroll-arrow-right !px-[10px]" onClick={onClickImagePreviewArrowRight}>
                                    <ChevronRightIcon style={{ width: 20, height: 20 }} />
                                </Button>
                            </div>
                        </Show>
                    </div>
                    <Show when={onClickZoomImage}>
                        <Button
                            variant="plain"
                            onClick={onClickZoomImage}
                            className={cx(
                                'button-zoom-image',
                                'absolute desktop:bottom-[16px] tablet:bottom-[12px] desktop:right-[-6px] tablet:right-[12px] mobile:bottom-[12px] mobile:right-[12px]',
                                'bg-neutral-white',
                                '!p-[10px]',
                            )}
                        >
                            <ArrowsPointingOutIcon className="h-[14px] w-[14px]" />
                        </Button>
                    </Show>
                </div>
            </Show>
            <Show when={(detectAutoScreen && !isDesktop && imagePreview) || horizontalThumbnail}>
                <ContainerScroll
                    variant="horizontal"
                    maxWidth={detectAutoScreen && !isMobile ? mainImage : null}
                    className={cx('image-slider-horizontal')}
                    itemsLength={data?.length}
                >
                    {
                        data && data?.map((item, index) => {
                            const isActive = indexActive === index;
                            return (
                                <div
                                    className="mr-[12px] mt-[12px]"
                                    key={`image-slider-horizontal-${index}`}
                                >
                                    <Image
                                        storeConfig={storeConfig}
                                        styleContainer={{
                                            height: thumbnailImage,
                                            width: thumbnailImage,
                                        }}
                                        className={cx(
                                            isActive && 'border-[1px] border-neutral-500',
                                            'w-full h-full',
                                            'p-[3px]',
                                            'rounded-[10px]',
                                            'cursor-pointer',
                                        )}
                                        src={item?.imageUrl}
                                        alt={item?.imageAlt ?? `slider image ${index}`}
                                        width={thumbnailImage}
                                        height={thumbnailImage}
                                        quality={80}
                                        widthMobile={thumbnailImage}
                                        heightMobile={thumbnailImage}
                                        onClick={() => onSelectedImage({ index, item })}
                                    />
                                </div>
                            );
                        })
                    }
                </ContainerScroll>
            </Show>
        </div>
    );
};

export default ImageSlider;
