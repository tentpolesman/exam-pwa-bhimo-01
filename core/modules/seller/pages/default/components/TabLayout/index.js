/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Typography from '@common_typography';

function TabLayout({ noBanner, t, children }) {
    const router = useRouter();
    const { route, query: { sellerId } } = router;
    const isTabOne = route === '/seller/[sellerId]';
    const isTabTwo = route === '/seller/[sellerId]/product' || noBanner;

    return (
        <>
            <div className="">
                {
                    !noBanner && (
                        <>
                            <Link replace href={{ pathname: `/seller/${sellerId}` }}>

                                <Typography type={isTabOne ? 'bold' : 'regular'} style={isTabOne ? { borderBottom: '2px solid #000' } : null} variant="h2" letter="capitalize">
                                    {t('seller:home')}
                                </Typography>

                            </Link>
                            <Link replace href={{ pathname: `/seller/${sellerId}/product` }}>

                                <Typography style={isTabTwo ? { borderBottom: '2px solid #000' } : null} type={isTabTwo ? 'bold' : 'regular'} variant="h2" letter="capitalize">
                                    {t('seller:product')}
                                </Typography>

                            </Link>
                        </>
                    )
                }
                {
                    noBanner && (
                        <a>
                            <Typography style={isTabTwo ? { borderBottom: '2px solid #000' } : null} type={isTabTwo ? 'bold' : 'regular'} variant="h2" letter="capitalize">
                                {t('seller:product')}
                            </Typography>
                        </a>
                    )
                }
            </div>
            <div>{children}</div>
        </>
    );
}

export default TabLayout;
