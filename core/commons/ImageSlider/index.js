/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cx from 'classnames';
import Image from '@common_image';
import Show from '@common_show';
import Button from '@common_button';
import ContainerScroll from '@common_containerscroll';
import useMediaQuery from '@hook/useMediaQuery';
import { ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { imageSize } from '@root/swift.config.js';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ImageSlider = ({
    data,
    storeConfig,
    onClickZoomImage,
    horizontalThumbnail,
    verticalThumbnail,
    detectAutoScreen = true,
    useZoom = true,
}) => {
    const [imagePreview, setImagePreview] = React.useState(null);
    const [indexActive, setIndexActive] = React.useState(0);
    const [showArrow, setShowArrow] = React.useState(false);
    const [toggleZoom, setToggleZoom] = React.useState(false);
    const {
        isDesktop, isMobile, screen, screenWidth,
    } = useMediaQuery();

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
                    className={cx('image-slider-vertical', 'px-[0px] mx-auto')}
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
                        width: isMobile ? '100%' : mainImage,
                        height: isMobile ? '100%' : mainImage,
                    }}
                    className={
                        cx(
                            'image-slider-preview',
                            'relative desktop:px-[16px] tablet:px-[0px] mobile:px-[16px]',
                            detectAutoScreen && 'tablet:mr-auto tablet:ml-[0px] mobile:mx-auto',
                            !detectAutoScreen && 'mx-auto',
                            isDesktop && 'pl-[24px]',
                        )
                    }
                >
                    <div
                        onMouseEnter={() => setShowArrow(true)}
                        onMouseLeave={() => setShowArrow(false)}
                        style={{
                            width: isMobile ? '100%' : mainImage,
                        }}
                        className={cx(
                            'container-image-slider-parent',
                            'relative',
                        )}
                    >
                        <Show when={useZoom}>
                            <TransformWrapper>
                                {({ zoomIn, zoomOut }) => (
                                    <TransformComponent
                                        wrapperStyle={{
                                            cursor: toggleZoom ? 'zoom-out' : 'zoom-in',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <div
                                            onClick={() => {
                                                setToggleZoom(!toggleZoom);
                                                if (toggleZoom) zoomOut();
                                                else zoomIn();
                                            }}
                                        >
                                            <Image
                                                storeConfig={storeConfig}
                                                className={
                                                    cx('w-full h-full', 'rounded-[12px]', 'cursor-zoom-in', 'mx-auto')
                                                }
                                                styleContainer={{
                                                    width: mainImage,
                                                    height: mainImage,
                                                }}
                                                src={imagePreview?.imageUrl}
                                                alt={imagePreview?.imageAlt ?? 'slider image preview'}
                                                quality={80}
                                                width={mainImage}
                                                height={mainImage}
                                                widthMobile={mainImage}
                                                heightMobile={mainImage}
                                            />
                                        </div>
                                    </TransformComponent>
                                )}
                            </TransformWrapper>
                        </Show>
                        <Show when={!useZoom}>
                            <Image
                                storeConfig={storeConfig}
                                className={
                                    cx(
                                        'w-full h-full',
                                        'rounded-[12px]',
                                    )
                                }
                                styleContainer={{
                                    width: isMobile ? '100%' : mainImage,
                                    height: isMobile ? '100%' : mainImage,
                                }}
                                src={imagePreview?.imageUrl}
                                alt={imagePreview?.imageAlt ?? 'slider image preview'}
                                width={mainImage}
                                height={mainImage}
                                widthMobile={mainImage}
                                heightMobile={mainImage}
                                quality={80}
                            />
                        </Show>

                        <Show when={showArrow}>
                            <Button
                                variant="tertiary"
                                className="container-scroll-arrow-left !px-[10px] absolute top-1/2 left-0 transform translate-x-1/2 -translate-y-1/2 z-[999]"
                                onClick={onClickImagePreviewArrowLeft}
                            >
                                <ChevronLeftIcon style={{ width: 20, height: 20 }} />
                            </Button>
                            <Button
                                variant="tertiary"
                                className="container-scroll-arrow-right !px-[10px] absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 z-[999]"
                                onClick={onClickImagePreviewArrowRight}
                            >
                                <ChevronRightIcon style={{ width: 20, height: 20 }} />
                            </Button>
                        </Show>
                    </div>
                    <Show when={onClickZoomImage}>
                        <Button
                            variant="plain"
                            onClick={onClickZoomImage}
                            className={cx(
                                'button-zoom-image absolute',
                                'desktop:bottom-[16px] tablet:bottom-[12px] desktop:right-[-6px]',
                                'tablet:right-[12px] mobile:bottom-[12px] mobile:right-[26px]',
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
                    style={isMobile ? { width: screenWidth } : {}}
                >
                    {
                        data && data?.map((item, index) => {
                            const isActive = indexActive === index;
                            return (
                                <div
                                    className={
                                        cx(
                                            'mr-[16px] mt-[12px]',
                                            'desktop:first:ml-[0px] desktop:last:mr-[0px]',
                                            'tablet:first:ml-[0px] tablet:last:mr-[0px]',
                                            'mobile:first:ml-[16px] mobile:last:mr-[6px]',
                                        )
                                    }
                                    key={`image-slider-horizontal-${index}`}
                                >
                                    <Image
                                        storeConfig={storeConfig}
                                        styleContainer={{
                                            height: thumbnailImage,
                                            width: thumbnailImage,
                                            cursor: 'pointer',
                                        }}
                                        className={cx(
                                            isActive && 'border-[1px] border-neutral-500',
                                            'w-full h-full',
                                            'p-[3px]',
                                            'rounded-[10px]',
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
