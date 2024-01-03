/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import React from 'react';
import { BREAKPOINTS } from '@theme_vars';
import cx from 'classnames';
import NextImage from 'next/image';

const Container = ({
    children, enable, className, style,
}) => (enable
    ? <span className={className} style={style}>{children}</span>
    : <>{children}</>);

const CustomImage = ({
    src,
    width = 0,
    height = 0,
    srcMobile,
    widthMobile = 0,
    heightMobile = 0,
    magezon,
    useContainer = true,
    classContainer = '',
    styleContainer: initStyleContainer = {},
    className = '',
    alt = 'Image',
    quality = 80,
    lazy = true,
    storeConfig = {},
    slickBanner = false,
    deviceType,
    preload = false,
    unoptimized = false,
}) => {
    const enable = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_https_http;
    const thumborUrl = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_url;
    const imageUrl = !unoptimized
        ? generateThumborUrl(src, width, height, enable, useHttpsOrHttp, thumborUrl, quality)
        : src;
    const imageUrlMobile = srcMobile && !unoptimized
        ? generateThumborUrl(srcMobile, widthMobile, heightMobile, enable, useHttpsOrHttp, thumborUrl, quality)
        : srcMobile;

    let styleContainer = {
        width: '100%',
        position: 'relative',
        paddingTop: `${(height / width) * 100}%`,
        overflow: 'hidden',
        display: 'block',
        ...initStyleContainer,
    };
    let styleImage = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        objectFit: 'cover',
    };

    if (magezon) {
        styleContainer = {
            width: 'fit-content',
            overflow: 'hidden',
            display: 'block',
        };
        styleImage = {
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'auto',
        };
    }

    if (slickBanner) {
        styleContainer = {};
        styleImage = {};
    }

    const imgTagDimensions = {
        width: !deviceType?.isMobile ? width || null : widthMobile || null,
        height: !deviceType?.isMobile ? height || null : heightMobile || null,
    };

    return (
        <Container enable={useContainer} className={classContainer} style={styleContainer}>
            <picture>
                {srcMobile ? (
                    <>
                        <source srcSet={imageUrlMobile} media={`(max-width: ${BREAKPOINTS.md - 1}px)`} type="image/webp" />
                        <source
                            srcSet={getImageFallbackUrl(imageUrlMobile)}
                            media={`(max-width: ${BREAKPOINTS.md - 1}px)`}
                            type="image/jpeg"
                        />
                    </>
                ) : (
                    <>
                        <source srcSet={imageUrl} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imageUrl)} type="image/jpeg" />
                    </>
                )}
                <NextImage
                    src={imageUrl}
                    loading={lazy && !preload ? 'lazy' : 'eager'}
                    style={styleImage}
                    className={cx('img', className)}
                    alt={alt}
                    {...imgTagDimensions}
                    unoptimized={false}
                    priority={preload}
                />
            </picture>
        </Container>
    );
};

export default CustomImage;
