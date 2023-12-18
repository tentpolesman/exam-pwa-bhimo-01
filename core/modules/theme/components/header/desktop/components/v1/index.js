/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import dynamic from 'next/dynamic';
import React from 'react';

import cx from 'classnames';

import { features } from '@config';
import { getCookies } from '@helper_cookies';

const DesktopHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/desktop'), { ssr: true });
const TabletHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/tablet'), { ssr: true });
const MobileHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/mobile'), { ssr: true });

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

    const [deviceType, setDeviceType] = React.useState({});

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
            if (window.innerWidth < 1200) {
                setDeviceType({
                    isDesktop: false,
                    isMobile: true,
                });
            } else {
                setDeviceType({
                    isDesktop: true,
                    isMobile: false,
                });
            }
        }
    }, []);

    return (
        <div
            id="header-inner"
            className={cx('z-[999]', 'w-[100%]', 'transition-all', 'delay-100', 'duration-500', 'ease-in-out', 'top-0', 'bg-neutral-white', {
                '!fixed': storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header && deviceWidth >= 768,
                '!relative': storeConfig && !storeConfig.pwa && !storeConfig.pwa.enabler_sticky_header,
                'top-[38px]': showGlobalPromo && deviceWidth >= 768,
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
                        customer={customer}
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
                        customer={customer}
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
    );
};

export default ViewTopNavigation;
