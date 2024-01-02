/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import dynamic from 'next/dynamic';
import React from 'react';
import MobileHeader from'@core_modules/theme/components/header/desktop/components/v1/adaptive/mobile';
import DesktopHeader from'@core_modules/theme/components/header/desktop/components/v1/adaptive/desktop';
import cx from 'classnames';

import { features } from '@config';
import { getCookies } from '@helper_cookies';
import { BREAKPOINTS } from '@root/core/theme/vars';

const TabletHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/tablet'), { ssr: true });

const ViewTopNavigation = (props) => {
    const {
        storeConfig,
        handleSearch,
        setValue,
        data,
        loading,
        t,
        isLogin,
        customer,
        handleLogout,
        vesMenuConfig,
        deviceWidth,
        appName,
        installMessage,
        ...other
    } = props;

    const [showGlobalPromo, setShowGlobalPromo] = React.useState(false);


    React.useEffect(() => {
        if (storeConfig && storeConfig.global_promo) {
            const showGlobalPromoCookies = getCookies(features.globalPromo.key_cookies);
            const { enable } = storeConfig.global_promo;
            if (enable && showGlobalPromoCookies === true) {
                setShowGlobalPromo(true);
            }
        }
    }, [storeConfig]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            // handle sticky
            if(storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
                let isDesktop = false;
                let isTablet = false;
                let isMobile = false;
                if (window.innerWidth >= BREAKPOINTS.xl) {
                    isDesktop = true;
                } else if (window.innerWidth >= BREAKPOINTS.md) {
                    isTablet = true;
                } else {
                    isMobile = true;
                } 
                
                // apply on tablet and desktop only
                if(!isMobile) {
                    const header = document.querySelector('header');
                    const innerHeader = document.querySelector('#header-inner');
                    const headerContent = document.querySelector('#header-inner .header-wrapper-main') || document.querySelector('#sticky-header .header-wrapper-main');
                    const main = document.querySelector('main');
                    const sticky = document.querySelector('#sticky-header');
                    let headerHeight = 0;
                    let globalPromoheight = 0;
                    let topHeaderheight = 0;
                    let midHeaderheight = 0;
                    let bottomHeaderheight = 0;
                    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const handleScroll = () => {
                        const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
                        headerHeight = header.offsetHeight;
                        globalPromoheight = document.querySelector('#global-promo-message')?.offsetHeight;
                        topHeaderheight = isDesktop ?
                            document.querySelector('.desktop-header .top-header')?.offsetHeight :
                            document.querySelector('#top-header-tablet')?.offsetHeight;
                        midHeaderheight = isDesktop ?
                            document.querySelector('.desktop-header .middle-header')?.offsetHeight :
                            document.querySelector('.tablet-header .middle-header-tablet')?.offsetHeight;
                        bottomHeaderheight = isDesktop ?
                            document.querySelector('.desktop-header .bottom-header')?.offsetHeight :
                            0;

                        if (scrollTopPosition > lastScrollTop) {
                            if(scrollTopPosition > headerHeight) {
                                sticky.style.top = `-${headerHeight}px`;
                                sticky.appendChild(headerContent);
                                header.style.height = `${globalPromoheight+topHeaderheight+midHeaderheight+bottomHeaderheight}px`;
                                sticky.style.top = isDesktop ? `-${topHeaderheight+midHeaderheight}px` : `-${topHeaderheight}px`;
                            }
                        } else if (scrollTopPosition < lastScrollTop) {
                            if(scrollTopPosition > (globalPromoheight+topHeaderheight)) {
                                sticky.style.top = `-${topHeaderheight}px`;
                            }else{
                                sticky.style.top = `-500px`;
                                innerHeader.appendChild(headerContent);
                                innerHeader.style.marginTop = 0;
                                header.style.height = 'initial';
                            }
                        }
                        lastScrollTop =scrollTopPosition <= 0 ? 0 : scrollTopPosition;
                    }
                    window.addEventListener('scroll', handleScroll);
                }
            };
        }
    }, []);

    return (
        <>
            <div 
                id="sticky-header"
                className={cx('top-[-500px]', 'bg-neutral-white', 'transition-all', 'duration-500', 'ease-in-out', 'animate__fadeInDown', 'z-[999]', 'w-[100%]', {
                    '!fixed': storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header && deviceWidth >= 768,
                    '!relative': storeConfig && !storeConfig.pwa && !storeConfig.pwa.enabler_sticky_header,
                })}
            ></div>
            <div
                id="header-inner"
                className={cx('top-0', 'bg-neutral-white', 'transition-all', 'duration-500', 'ease-in-out', 'animate__fadeInDown', {
                    // 'top-[38px]': showGlobalPromo && deviceWidth >= 768
                })}
            >
                <div className={cx('header-wrapper-main')}>
                    <div className="header-main">
                        <DesktopHeader
                            t={t}
                            storeConfig={storeConfig}
                            isLogin={isLogin}
                            setValue={setValue}
                            handleSearch={handleSearch}
                            dataVesMenu={data}
                            loadingVesMenu={loading}
                            vesMenuConfig={vesMenuConfig}
                            handleLogout={handleLogout}
                            customer={customer.customer}
                            deviceWidth={deviceWidth}
                            {...other}
                        />
                        <TabletHeader
                            t={t}
                            storeConfig={storeConfig}
                            isLogin={isLogin}
                            setValue={setValue}
                            handleSearch={handleSearch}
                            dataVesMenu={data}
                            loadingVesMenu={loading}
                            vesMenuConfig={vesMenuConfig}
                            handleLogout={handleLogout}
                            customer={customer.customer}
                            deviceWidth={deviceWidth}
                            {...other}
                        />
                        <MobileHeader
                            t={t}
                            storeConfig={storeConfig}
                            isLogin={isLogin}
                            setValue={setValue}
                            handleSearch={handleSearch}
                            dataVesMenu={data}
                            loadingVesMenu={loading}
                            vesMenuConfig={vesMenuConfig}
                            handleLogout={handleLogout}
                            customer={customer}
                            showGlobalPromo={showGlobalPromo}
                            deviceWidth={deviceWidth}
                            appName={appName}
                            installMessage={installMessage}
                            {...other}
                        />
                    </div>
                </div>
                <style jsx>
                    {`
                        .header-wrapper-main {
                            background-color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.background_color};
                        }
                        .menu-category {
                            width: fit-content;
                            display: block;
                        }
                    `}
                </style>
                <style global jsx>
                    {`
                        .hidden-submenu {
                            display: none !important;
                            transition: display 1s ease;
                        }
                        .header-small {
                            top: -45px !important;
                        }
                        @media (min-width: 1250px) {
                            .header-small {
                                height: 75px !important;
                            }
                            .hidden-submenu {
                                display: none !important;
                                transition: display 1s ease;
                            }
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default ViewTopNavigation;
