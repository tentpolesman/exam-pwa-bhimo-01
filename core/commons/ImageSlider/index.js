/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import cx from 'classnames';
import Image from '@common_image';
import Show from '@common_show';
import Button from '@common_button';
import ContainerScroll from '@common_containerscroll';
import useMediaQuery from '@hook/useMediaQuery';
import Link from 'next/link';
import { ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { modules } from '@root/swift.config.js';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSwipeable } from 'react-swipeable';

const ImageSliderVideo = ({
    mainImage,
    urlEmbed,
    videoUrl,
    video,
    swipeHandlers,
}) => {
    const { isMobile } = useMediaQuery();
    if (urlEmbed || video) {
        const urlVideoTag = video ? video.split('"') : null;
        return (
            <iframe
                {...swipeHandlers}
                width={isMobile ? '100%' : mainImage}
                height={mainImage}
                src={urlEmbed || urlVideoTag[5]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={urlVideoTag ? urlVideoTag[8] : ''}
            />
        );
    }

    if (videoUrl) {
        const urlVideo = videoUrl && videoUrl?.video_url?.split('/');
        const urlVideoSrc = urlVideo?.length > 1 ? `https://www.youtube.com/embed/${urlVideo[3]}` : null;
        return (
            <iframe
                {...swipeHandlers}
                width={isMobile ? '100%' : mainImage}
                height={mainImage}
                src={urlVideoSrc}
                title={videoUrl.video_title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }
    return null;
};

// image when preview with zoom
const ImageSliderSelectedPreview = ({
    toggleZoom,
    setToggleZoom,
    imagePreview,
    mainImage,
    storeConfig,
}) => {
    const isEmbedOrVideo = imagePreview?.urlEmbed || imagePreview?.video;
    const isVideoUrl = imagePreview?.videoUrl;

    if (isEmbedOrVideo) {
        return (
            <ImageSliderVideo
                mainImage={mainImage}
                urlEmbed={imagePreview?.urlEmbed}
                video={imagePreview?.video}
            />
        );
    }

    if (isVideoUrl && isVideoUrl !== '#') {
        return (
            <ImageSliderVideo
                mainImage={mainImage}
                videoUrl={imagePreview.videoUrl}
            />
        );
    }

    return (
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
    );
};

// hero image
const ImageSliderSelected = ({
    useZoom,
    isMobile,
    imagePreview,
    storeConfig,
    mainImage,
    mainImagePreview,
    swipeHandlers,
}) => {
    const isEmbedOrVideo = imagePreview?.urlEmbed || imagePreview?.video;
    const isVideoUrl = imagePreview?.videoUrl;
    const link = imagePreview?.link;
    const linkHref = (link && link.includes('http://')) || link.includes('https://') ? link : link[0] === '/' ? link : `/${link}`;

    if (isEmbedOrVideo) {
        return (
            <ImageSliderVideo
                swipeHandlers={swipeHandlers}
                mainImage={mainImage}
                urlEmbed={imagePreview?.urlEmbed}
                video={imagePreview?.video}
            />
        );
    }

    if (isVideoUrl && isVideoUrl !== '#') {
        return (
            <ImageSliderVideo
                swipeHandlers={swipeHandlers}
                mainImage={mainImage}
                videoUrl={imagePreview.videoUrl}
            />
        );
    }

    if (link !== '#') {
        return (
            <Link href={linkHref} passHref>
                <Image
                    storeConfig={storeConfig}
                    className={
                        cx(
                            'w-full h-full',
                            'rounded-[12px]',
                        )
                    }
                    styleContainer={{
                        width: isMobile ? '100%' : useZoom ? mainImagePreview : mainImage,
                        height: isMobile ? '100%' : useZoom ? 'auto' : mainImage,
                    }}
                    src={imagePreview?.imageUrl}
                    alt={imagePreview?.imageAlt ?? 'slider image preview'}
                    width={mainImage}
                    height={mainImage}
                    widthMobile={mainImage}
                    heightMobile={mainImage}
                    quality={80}
                />
            </Link>
        );
    }
    return (
        <Image
            storeConfig={storeConfig}
            className={
                cx(
                    'w-full h-full',
                    'rounded-[12px]',
                )
            }
            styleContainer={{
                width: isMobile ? '100%' : useZoom ? mainImagePreview : mainImage,
                height: isMobile ? '100%' : useZoom ? 'auto' : mainImage,
            }}
            src={imagePreview?.imageUrl}
            alt={imagePreview?.imageAlt ?? 'slider image preview'}
            width={mainImage}
            height={mainImage}
            widthMobile={mainImage}
            heightMobile={mainImage}
            quality={80}
        />
    );
};

const ImageSlider = ({
    data,
    storeConfig,
    onClickZoomImage,
    horizontalThumbnail,
    verticalThumbnail,
    detectAutoScreen = true,
    useZoom = true,
    imageProps = {},
    customStyleImageWrapper = {},
    customStyleImageContainer = {},
    customClassImageWrapper = '',
}) => {
    const [imagePreview, setImagePreview] = React.useState(null);
    const [indexActive, setIndexActive] = React.useState(0);
    const [showArrow, setShowArrow] = React.useState(false);
    const [toggleZoom, setToggleZoom] = React.useState(false);
    const {
        isDesktop, isMobile, screen, screenWidth,
    } = useMediaQuery();

    const thumbnailImage = modules.product.imageSize.thumbnail[screen];
    const mainImage = modules.product.imageSize.main[screen];
    const mainImagePreview = modules.product.imageSize.main_preview[screen];

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

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            onClickImagePreviewArrowRight();
        },
        onSwipedRight: () => {
            onClickImagePreviewArrowLeft();
        },
    });

    React.useEffect(() => {
        if (data && data?.length > 0) {
            setImagePreview(data[indexActive]);
        }
    }, [data]);

    return (
        <div className={cx('image-slider', detectAutoScreen && isDesktop && 'inline-flex', detectAutoScreen && !isDesktop && 'flex flex-col')}>
            <Show when={(detectAutoScreen && isDesktop) || verticalThumbnail}>
                <ContainerScroll
                    variant="vertical"
                    maxHeight={mainImage}
                    style={{ width: thumbnailImage }}
                    className={
                        cx(
                            'image-slider-vertical',
                            'px-[0px] mx-auto',
                            'm-0 !p-0',
                        )
                    }
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
                        width: isMobile ? '100%' : useZoom ? mainImagePreview : mainImage,
                        height: isMobile ? '100%' : useZoom ? 'auto' : mainImage,
                        ...customStyleImageWrapper,
                    }}
                    className={
                        cx(
                            'z-[999]',
                            'image-slider-preview',
                            'relative desktop:px-[16px] tablet:px-[0px] mobile:px-[16px]',
                            detectAutoScreen && 'tablet:mr-auto tablet:ml-[0px] mobile:mx-auto',
                            !detectAutoScreen && 'mx-auto',
                            isDesktop && 'pl-[24px]',
                            customClassImageWrapper,
                        )
                    }
                >
                    <div
                        {...swipeHandlers}
                        onMouseEnter={() => setShowArrow(true)}
                        onMouseLeave={() => setShowArrow(false)}
                        style={{
                            width: isMobile ? '100%' : useZoom ? mainImagePreview : mainImage,
                            ...customStyleImageContainer,
                        }}
                        className={cx(
                            'container-image-slider-parent',
                            'relative',
                        )}
                    >
                        <Show when={useZoom}>
                            <ImageSliderSelectedPreview
                                swipeHandlers={swipeHandlers}
                                toggleZoom={toggleZoom}
                                setToggleZoom={setToggleZoom}
                                imagePreview={imagePreview}
                                mainImage={mainImagePreview}
                                storeConfig={storeConfig}
                            />
                        </Show>
                        <Show when={!useZoom}>
                            <ImageSliderSelected
                                swipeHandlers={swipeHandlers}
                                useZoom={useZoom}
                                isMobile={isMobile}
                                imagePreview={imagePreview}
                                mainImage={mainImage}
                                mainImagePreview={mainImagePreview}
                                storeConfig={storeConfig}
                                onClickImagePreviewArrowRight={onClickImagePreviewArrowRight}
                                onClickImagePreviewArrowLeft={onClickImagePreviewArrowLeft}
                                {...imageProps}
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
                    className={cx(
                        'image-slider-horizontal',
                        useZoom && 'desktop:mt-[0px] tablet:mt-[0px] mobile:mt-[0px]',
                    )}
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
                                            !useZoom && 'mr-[16px] mt-[12px]',
                                            useZoom && 'mr-[16px] mt-[0px]',
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
