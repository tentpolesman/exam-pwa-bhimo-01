/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import Link from 'next/link';
import React from 'react';
import cx from 'classnames';

import Show from '@common/Show';
import dynamic from 'next/dynamic';

const CmsRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer'));

const Detail = (props) => {
    const {
        handleClick,
        name,
        ratingValue,
        enableRating,
        storeConfig = {},
        seller,
        urlKey,
        showShortDescription = false,
        short_description,
        Pricing,
        isGrid = true,
        enableProductName = true,
    } = props;
    const showRating = typeof enableRating !== 'undefined' ? enableRating : storeConfig?.pwa?.rating_enable;
    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1';

    let shortDescription = '';

    if (typeof short_description === 'string') {
        shortDescription = '';
    } else if (short_description) {
        shortDescription = short_description.html;
    }

    return (
        <div className="flex flex-col gap-1 relative w-full">
            <Show when={enableMultiSeller && seller && seller.seller_name}>
                <div className="flex">
                    <Typography
                        variant="p"
                        className={cx(
                            'line-clamp-2 text-primary capitalize mb-[2px] tablet:mb-[6px]',
                            isGrid && 'text-sm tablet:text-md',
                            !isGrid && 'text-xs tablet:text-md',
                        )}
                        color="primary"
                        letter="capitalize"
                    >
                        {seller.seller_name || ''}
                    </Typography>
                </div>
            </Show>
            <Show when={enableProductName}>
                <Link href="/[...slug]" as={`/${urlKey}`} className="w-full" onClick={() => handleClick(props)} id="plugin-productTitle-typography">
                    <Typography
                        className={cx(
                            'font-medium line-clamp-2 mb-[6px] capitalize',
                            isGrid && 'text-[14px] tablet:text-[16px]',
                            !isGrid && 'text-sm tablet:text-[16px]',
                        )}
                    >
                        {name}
                    </Typography>
                </Link>
            </Show>
            <Show when={showShortDescription && shortDescription && !isGrid}>
                <div className="hidden tablet:flex !line-clamp-2 text-md text-neutral-500 leading-5">
                    <CmsRenderer content={shortDescription} />
                </div>
            </Show>

            <Show when={showRating}>
                <div className="hidden desktop:flex">
                    <RatingStar value={ratingValue || 3} sizeIcon="lg" />
                </div>
                <div className="flex desktop:hidden">
                    <RatingStar value={ratingValue || 3} sizeIcon="sm" />
                </div>
            </Show>
            {Pricing && Pricing}
        </div>
    );
};

export default Detail;
