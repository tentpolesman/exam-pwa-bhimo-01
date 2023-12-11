/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import dynamic from 'next/dynamic';
import React from 'react';

import cx from 'classnames';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { features } from '@config';
import { getCookies } from '@helper_cookies';

const DesktopHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/desktop'), { ssr: false });
const TabletHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/tablet'), { ssr: false });
const MobileHeader = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/adaptive/mobile'), { ssr: false });

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
        deviceType,
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

    return (
        <div
            id="header-inner"
            className={cx('z-[1100]', 'w-[100%]', 'transition-all', 'delay-100', 'duration-500', 'ease-in-out', 'top-0', 'bg-neutral-white', {
                '!fixed': storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header && deviceWidth >= 768,
                '!relative': storeConfig && !storeConfig.pwa && !storeConfig.pwa.enabler_sticky_header,
                'top-[38px]': showGlobalPromo && deviceWidth >= 768,
            })}
        >
            <main>
                <div className="header-main">
                    {deviceType && deviceType.isDesktop === true && (
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
                        />
                    )}
                    {deviceType && deviceType.isMobile === true && deviceWidth && deviceWidth > 1200 ? (
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
                        />
                    ) : (
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
                        />
                    )}
                </div>
            </main>
            <style jsx>
                {`
                    main {
                        background-color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.background_color};
                    }
                    .menu-category {
                        width: fit-content;
                        display: block;
                    }
                    .global-promo {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        margin: 0;
                        background-color: red;
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
