/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import Link from 'next/link';
import React from 'react';

import parse from 'html-react-parser';

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
            {enableMultiSeller && seller && seller.seller_name && (
                <div className="flex">
                    <Typography
                        variant="p"
                        className="line-clamp-2 text-primary capitalize mb-[6px]"
                        color="primary"
                        letter="capitalize"
                    >
                        {seller.seller_name || ''}
                    </Typography>
                </div>
            )}
            <Link
                href="/[...slug]"
                as={`/${urlKey}`}
                className="w-full"
                onClick={() => handleClick(props)}
                id="plugin-productTitle-typography"
            >

                <Typography
                    className="font-medium line-clamp-2 mb-[6px] capitalize"
                >
                    {name}
                </Typography>
            </Link>
            {
                showShortDescription && shortDescription && (

                    <div className="hidden tablet:flex line-clamp-2 text-md text-neutral-500 leading-5">
                        {parse(shortDescription)}
                    </div>
                )
            }
            {showRating && <RatingStar value={ratingValue || 3} />}
            {Pricing && Pricing}
        </div>
    );
};

export default Detail;
