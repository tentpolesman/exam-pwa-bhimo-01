/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import cx from 'classnames';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import React from 'react';

import Button from '@common_button';
import Drawer from '@common_drawer';
import Image from '@common_image';
import Tabs from '@common_tabs';
import Typography from '@common_typography';

import config from '@config';

import Cookies from 'js-cookie';
import TagManager from 'react-gtm-module';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/desktop/components/autocomplete'), { ssr: false });
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'), { ssr: true });
const GlobalPromoMessage = dynamic(() => import('@core_modules/theme/components/globalPromo'), { ssr: true });

const TabletMobile = (props) => {
    const {
        t,
        storeConfig,
        isLogin,
        setValue,
        handleSearch,
        dataVesMenu,
        loadingVesMenu,
        vesMenuConfig,
        handleLogout,
        showGlobalPromo,
        handleClosePromo,
        appName,
        installMessage,
        deviceWidth,
    } = props;

    const { modules } = config;
    const adminId = Cookies.get('admin_id');

    const [isSearchShown, setIsSearchShown] = React.useState(false);

    const handleClickInstallApp = () => {
        const timestamp = Date.now();
        const identifier = `${Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100)}_${timestamp}`;
        const dataLayer = {
            event: 'countPopupInstallation',
            eventCategory: 'Count Popup Installation',
            eventAction: 'Installed',
            eventLabel: 'installPWA',
            eventValue: identifier,
        };
        TagManager.dataLayer({ dataLayer });
    };

    const closePopup = () => {
        const el = document.getElementById('popup-mobile__install');
        // hidden popup
        if (el) {
            el.style.display = 'none';
        }

        const date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        localStorage.setItem('hideInstallPopup', true);
        localStorage.setItem('expiredHideInstallPopup', date.getDate());
    };

    const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);

    const burgerMenuData = [
        {
            title: 'Menu',
            content: <p className={cx('p-4')}>Reserved For Ves Menu</p>,
            type: 'react-component',
        },
        {
            title: 'Account',
            content: (
                <>
                    {!isLogin ? (
                        <div className={cx('p-4')}>
                            <div className={cx('grid', 'grid-cols-1', 'gap-y-4', 'pb-4', 'border-b-[1px]', 'border-neutral-300')}>
                                <Link href="/customer/account" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>My Account</Typography>
                                </Link>
                                <Link href="/wishlist" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>My Wishlist</Typography>
                                </Link>
                                <Link href="/catalog/product_compare" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>Compare Products</Typography>
                                </Link>
                                <Button
                                    className={cx(
                                        '!px-0',
                                        '!py-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={handleLogout}
                                    variant="tertiary"
                                    classNameText={cx('!text-red-500')}
                                >
                                    <Typography className={cx('py-[0]', 'px-4', 'text-red-500')}>Log Out</Typography>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('p-4')}>
                            <div className={cx('grid', 'grid-cols-1', 'gap-y-4', 'pb-4')}>
                                <Link href="/customer/account/login" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>Log in / Register</Typography>
                                </Link>
                                <Link href="/catalog/product_compare" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>Compare Products</Typography>
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            ),
            type: 'react-component',
        },
    ];

    return (
        <div
            className={cx('mobile-header', 'mobile:max-tablet:block', 'tablet:hidden', 'transition-all', 'delay-100', 'duration-500', 'ease-in-out')}
        >
            <div
                className={cx(
                    'float-header-mobile__content--popup-installation',
                    'py-3',
                    'px-4',
                    'flex',
                    'flex-row',
                    'gap-x-[10px]',
                    'fixed',
                    'bottom-0',
                    'z-[1050]',
                    'w-[100vw]',
                    'bg-neutral-white',
                )}
                id="popup-mobile__install"
            >
                <div className={cx('install_image', 'basis-10', 'shrink-0', 'flex', 'items-center', 'justify-center')}>
                    <img src="/assets/img/mobile_install_logo.png" width={30} height={32} />
                </div>
                <div className={cx('install_info', 'basis-full')}>
                    <Typography variant="bd-3a" className={cx('text-neutral-700', 'block')}>
                        {appName}
                    </Typography>
                    <Typography variant="bd-3a" className={cx('text-[12px]', 'text-neutral-500', 'text-xs', 'font-normal', 'leading-sm')}>
                        {installMessage}
                    </Typography>
                </div>
                <div className={cx('install_button', 'flex', 'items-center')}>
                    <Button
                        className={cx(
                            'm-0',
                            'hover:shadow-none',
                            'focus:shadow-none',
                            'active:shadow-none',
                            'active:shadow-none',
                            'px-4',
                            'py-[5px]',
                        )}
                        onClick={handleClickInstallApp}
                        variant="primary"
                        id="btn-install__mobile"
                    >
                        <Typography className={cx('!text-neutral-white')}>Install</Typography>
                    </Button>
                    <Button
                        className={cx('m-0', '!px-0', '!pl-1', 'hover:shadow-none', 'focus:shadow-none', 'active:shadow-none', 'active:shadow-none')}
                        onClick={() => {
                            closePopup();
                        }}
                        icon={<XMarkIcon />}
                        iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]') }}
                        iconOnly
                        variant="tertiary"
                        classNameText={cx('!text-neutral-700')}
                    />
                </div>
            </div>
            <div id="top-header-mobile" className={cx('top-header__mobile', 'py-[1px]')}>
                <div
                    id="top-header__content"
                    className={cx('top-header-mobile__content', 'mobile:max-tablet:max-w-[100%] tablet:hidden', 'm-[0_auto]')}
                >
                    {showGlobalPromo ? (
                        <div className={cx('top-header-mobile__content--global-promo')}>
                            <GlobalPromoMessage
                                t={t}
                                storeConfig={storeConfig}
                                showGlobalPromo={showGlobalPromo}
                                handleClose={handleClosePromo}
                                isMobile
                            />
                        </div>
                    ) : null}
                </div>
            </div>
            <div className={cx('bottom-header-mobile', 'shadow-2xl')}>
                <Drawer
                    open={openBurgerMenu}
                    handleClose={() => setOpenBurgerMenu(false)}
                    position="left"
                    className={cx('mobile:max-tablet:w-[320px]')}
                >
                    <Tabs
                        data={burgerMenuData}
                        tabHasContent
                        tabWrapperClassName={cx('border-none')}
                        tabTitleWrapperClassName={cx('grid', 'grid-cols-2')}
                        tabTitleClassName={cx('border-none', '!text-neutral-700', 'text-2md', 'font-semibold')}
                        tabTitleActiveClassName={cx('border-none', '!text-neutral-700', 'text-2md', 'font-semibold')}
                        tabTitleListClassName={cx('bg-neutral-100')}
                        tabTitleListActiveClassName={cx('bg-neutral-white', 'border-b-[1px]', 'border-b-neutral-400')}
                        tabContentClassName={cx('pt-0')}
                    />
                </Drawer>
                <div
                    className={cx(
                        'bottom-header-mobile__wrapper',
                        'm-[0_auto]',
                        'grid',
                        'grid-cols-[1fr_7fr_2fr]',
                        'mobile:max-tablet:max-w-[100%]',
                        'px-4',
                    )}
                >
                    <div className={cx('bottom-header-mobile__burger-menu')}>
                        <Button
                            className={cx(
                                'm-2',
                                '!px-0',
                                '!pb-0',
                                '!pt-2',
                                '!ml-0',
                                'hover:shadow-none',
                                'focus:shadow-none',
                                'active:shadow-none',
                                'active:shadow-none',
                            )}
                            onClick={() => {
                                setOpenBurgerMenu(true);
                            }}
                            icon={<Bars3Icon />}
                            iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]') }}
                            iconOnly
                            variant="tertiary"
                            classNameText={cx('!text-neutral-700')}
                        />
                    </div>
                    <div
                        className={cx(
                            'bottom-header-mobile__logo',
                            'h-[34px]',
                            'h-[34px]',
                            'w-[74px]',
                            'text-center',
                            'mt-2',
                            'relative',
                            'right-[auto]',
                            'left-[40%]',
                        )}
                    >
                        <Link href="/" legacyBehavior>
                            <a>
                                <Image
                                    className={cx('bottom-header-mobile__logo-link')}
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                    alt={storeConfig.default_title}
                                    width={74}
                                    height={34}
                                    storeConfig={storeConfig}
                                    lazy={false}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={cx('bottom-header-mobile__statusicon')}>
                        <div className={cx('middle-header__statusicon', 'flex', 'flex-wrap', 'flex-column', 'justify-between')}>
                            <div className="search-icon">
                                <Button
                                    className={cx(
                                        'mt-4',
                                        '!px-0',
                                        '!py-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={() => setIsSearchShown(!isSearchShown)}
                                    icon={<MagnifyingGlassIcon />}
                                    iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]') }}
                                    iconOnly
                                    variant="tertiary"
                                    classNameText={cx('!text-neutral-700')}
                                />
                            </div>
                            <div id="header-shoppingBag-icon" className="shopping-bag">
                                <ShoppingBagIcon withLink storeConfig={storeConfig} />
                            </div>
                        </div>
                    </div>
                </div>
                {isSearchShown ? (
                    <div className={cx('bottom-header-mobile__search')}>
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} deviceWidth={deviceWidth} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default TabletMobile;
