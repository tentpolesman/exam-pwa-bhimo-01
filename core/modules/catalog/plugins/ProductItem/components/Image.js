/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import Link from 'next/link';
import React from 'react';
import { basePath } from '@config';
import cx from 'classnames';

const ImageDetail = (props) => {
    const {
        handleClick, small_image, spesificProduct, urlKey, name, storeConfig = {},
        classContainer = '', className = '',
    } = props;

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);
    return (
        (
            <Link
                href={{
                    pathname: '/[...slug]',
                    query: {
                        slug: urlKey,
                    },
                }}
                onClick={handleClick}
                className={cx(
                    'overflow-hidden flex justify-center',
                )}
            >

                <Thumbor
                    // eslint-disable-next-line no-nested-ternary
                    src={spesificProduct.id ? spesificProduct.image.url
                        : small_image && small_image.url
                            ? small_image.url
                            : `${basePath}/assets/img/placeholder.png`}
                    className={cx(
                        '!w-[114px] !h-[114px] tablet:!w-[205px] tablet:!h-[205px] desktop:!w-[250px] desktop:!h-[250px] overflow-hidden',
                        className,
                    )}
                    classContainer={cx(
                        '!w-[114px] !h-[114px] tablet:!w-[205px] tablet:!h-[205px] desktop:!w-[250px] desktop:!h-[250px]',
                        classContainer,
                    )}
                    styleContainer={{ padding: 0 }}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                    alt={small_image && small_image.url ? small_image.label : name}
                    storeConfig={storeConfig}
                    lazy
                />

            </Link>
        )
    );
};

export default ImageDetail;
