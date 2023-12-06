/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import Image from '@common_image';
import Menu from '@core_modules/theme/components/header/desktop/components/v1/mcategory';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import Typography from '@common_typography';

import '@fortawesome/fontawesome-free/css/all.min.css';
import DevicePhoneMobileIcon from '@heroicons/react/24/solid/DevicePhoneMobileIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';

const ProductCompareIcon = dynamic(() => import('@core_modules/catalog/plugins/ProductCompare'));
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'));
const NotificationBell = dynamic(() => import('@plugin_notificationbell'));
// const DesktopInstallApp = dynamic(() => import('@core_modules/theme/components/custom-install-popup/desktop'), { ssr: false });
const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/desktop/components/autocomplete'), { ssr: false });
const TopMenu = dynamic(() => import('@core_modules/theme/components/header/desktop/components/mtop'), { ssr: false });

const ViewTopNavigation = (props) => {
    const {
        storeConfig,
        handleSearch,
        searchByClick,
        setValue,
        value,
        data,
        loading,
        t,
        isLogin,
        customer,
        handleLogout,
        app_cookies,
        showGlobalPromo,
        modules,
        vesMenuConfig,
        appName = 'Swift PWA',
        installMessage = 'Install',
        enablePopupInstallation = false,
    } = props;

    const installAppRef = React.useRef(null);

    console.log(installAppRef.current);

    return (
        <div id="header-inner">
            {/* <div className="flex flex-row header-top">
                <main style={{ width: '97%' }}>
                    {enablePopupInstallation ? <DesktopInstallApp appName={appName} installMessage={installMessage} /> : null}
                    <TopMenu t={t} isLogin={isLogin} data={customer} handleLogout={handleLogout} app_cookies={app_cookies} />
                </main>
            </div> */}
            <main>
                <div className="header-main">
                    <div
                        id="top-header"
                        className={cx(
                            'top-header',
                            'mobile:max-desktop:hidden',
                            'tablet:pt-0',
                            'tablet:pb-3',
                            'tablet:border-b-[1.5px]',
                            'tablet:border-b-neutral-300',
                        )}
                        ref={installAppRef}
                    >
                        <div
                            className={cx(
                                'top-header__statusicon__left-section__account',
                                'mt-3',
                                'grid grid-cols-[75%_12.5%_12.5%]',
                                'tablet:max-w-[768px] desktop:max-w-[1200px]',
                                'm-[0_auto]',
                            )}
                        >
                            <div className={cx('popup-installation')}>
                                <DevicePhoneMobileIcon className={cx('w-[20px]', 'text-neutral-600', 'inline-block')} />
                                <Typography variant="bd-2b" className={cx('inline-block', 'pl-2')}>
                                    Download Apps
                                </Typography>
                            </div>
                            <div className={cx('confirmation-payment-menu')}>
                                <Typography variant="bd-2b" className={cx('inline-block', 'pl-2')}>
                                    Confirm Payment
                                </Typography>
                            </div>
                            <div className={cx('tracking-order-menu')}>
                                <Typography variant="bd-2b" className={cx('inline-block', 'pl-2')}>
                                    Tracking Order
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div
                        className={cx(
                            'middle-header',
                            'mobile:max-desktop:hidden',
                            'tablet:border-b-[1.5px]',
                            'tablet:border-b-neutral-300',
                            'tablet:py-4',
                        )}
                    >
                        <div
                            className={cx(
                                'middle-header__wrapper',
                                'tablet:max-w-[768px] desktop:max-w-[1200px]',
                                'm-[0_auto]',
                                'grid',
                                'grid-cols-[1fr_2fr_1fr]',
                            )}
                        >
                            <div className={cx('middle-header__logo', 'w-[120px]')}>
                                <Link href="/" legacyBehavior>
                                    <a>
                                        <Image
                                            className="header-middle__logo-link"
                                            src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                            alt={storeConfig.default_title}
                                            width={120}
                                            height={52}
                                            storeConfig={storeConfig}
                                            lazy={false}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className={cx('middle-header__search')}>
                                <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} />
                            </div>
                            <div className={cx('middle-header__statusicon', 'grid', 'grid-cols-2')}>
                                <div className={cx('middle-header__statusicon__left-section', 'grid', 'grid-cols-3')}>
                                    <div className="notification">
                                        <NotificationBell withLink />
                                    </div>
                                    {modules.productcompare.enabled && (
                                        <div className="product-compare">
                                            <ProductCompareIcon withLink isLogin={isLogin} />
                                        </div>
                                    )}
                                    <div id="header-shoppingBag-icon" className="shopping-bag">
                                        <ShoppingBagIcon withLink storeConfig={storeConfig} />
                                    </div>
                                </div>
                                <div className={cx('middle-header__statusicon__right-section', 'border-l-[1.5px]', 'border-l-neutral-300')}>
                                    <div className={cx('middle-header__statusicon__right-section__account', 'pl-2', 'mt-3')}>
                                        <UserIcon className={cx('w-[24px]', 'text-neutral-600', 'inline-block')} />
                                        <Typography variant="bd-2b" className={cx('inline-block', 'pl-2')}>
                                            Login/Register
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('bottom-header', 'tablet:max-w-[768px] desktop:max-w-[1200px]', 'm-[0_auto]', 'mobile:max-desktop:hidden')}>
                        <div className="flex flex-row menu-category">
                            <div className="xs:basis-full menu-middle">
                                {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                {console.log(data)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <style jsx>
                {`
                    .header-main {
                        margin: 0 auto;
                    }
                    @media (min-width: 768px) {
                        #header-inner {
                            position: relative;
                            z-index: 1100;
                            ${storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header
                                ? 'position: fixed;'
                                : 'position: relative; z-index: 1100;'}
                            width: 100%;
                            background: white;
                            z-index: 999;
                            top: ${showGlobalPromo ? '45px' : '0'};
                            transition: top 1s ease;
                        }
                        #header-inner.header-inner {
                            top: 0px;
                        }
                        .hidden-submenu {
                            display: none !important;
                            transition: display 1s ease;
                        }
                    }
                    main {
                        background-color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.background_color};
                    }
                    .header-top {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        margin: 0;
                    }
                    @media only screen and (max-width: 1023px) and (min-width: 768px) {
                        .header-top {
                            height: unset;
                            padding-top: 0;
                        }
                    }
                    .header-middle {
                        padding-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .header-middle__left {
                        width: 120px;
                    }
                    .header-middle__right {
                        width: 600px;
                    }
                    .header-middle img {
                        width: 120px;
                    }
                    .header-middle__logo-link {
                        cursor: pointer;
                    }
                    .header-middle__icons {
                        float: right;
                        padding-left: 4px;
                        padding-right: 16px;
                    }
                    .header-middle__icons > div {
                        margin-right: -5px;
                        margin-left: 0px;
                        display: inline-block;
                    }
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 7px;
                        background: #fff;
                        z-index: 9;
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        float: right;
                        position: relative;
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
};;;;;;;;;;;;;

export default ViewTopNavigation;
