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

import Cookies from 'js-cookie';
import TagManager from 'react-gtm-module';

import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import DevicePhoneMobileIcon from '@heroicons/react/24/solid/DevicePhoneMobileIcon';

import { getCategories } from '@core_modules/theme/services/graphql';
import { BREAKPOINTS } from '@root/core/theme/vars';

const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/components/autocomplete'), { ssr: false });
const BurgerMenuCategories = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/categories'), { ssr: false });
const BurgerMenuAccount = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/account/index'), { ssr: false });
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'), { ssr: true });
const NotificationBell = dynamic(() => import('@plugin_notificationbell'), { ssr: true });
const SwitcherCurrency = dynamic(() => import('@common_currency'), { ssr: false });
const SwitcherLanguage = dynamic(() => import('@common_language'), { ssr: false });

const TabletHeader = (props) => {
    const { t, storeConfig, isLogin, setValue, handleSearch, handleLogout, deviceWidth, ...other } = props;

    const adminId = Cookies.get('admin_id');

    const { data } = getCategories();

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

    const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);

    const burgerMenuData = [
        {
            title: 'Menu',
            content: data && <BurgerMenuCategories data={data.categories.items[0].children} />,
            type: 'react-component',
        },
        {
            title: 'Account',
            content: <BurgerMenuAccount isLogin={isLogin} handleLogout={handleLogout} {...other} />,
            type: 'react-component',
        },
    ];

    return (
        <div
            className={cx(
                'tablet-header',
                'tablet:max-desktop:block',
                'desktop:hidden',
                'mobile:max-tablet:hidden',
                'transition-all',
                'delay-100',
                'duration-500',
                'ease-in-out',
                'shadow-md',
                {
                    'hidden-this-tablet': deviceWidth < BREAKPOINTS.md || deviceWidth > BREAKPOINTS.xl,
                },
            )}
        >
            <div id="top-header-tablet" className={cx('top-header__tablet', 'tablet:border-b-[1.5px]', 'tablet:border-b-neutral-300', 'py-[1px]')}>
                <div
                    id="top-header__content"
                    className={cx(
                        'top-header-tablet__content',
                        'flex',
                        'flex-row',
                        'justify-between',
                        'gap-x-4',
                        'tablet:max-w-[768px] desktop:hidden mobile:max-tablet:hidden',
                        'px-6',
                        'm-[0_auto]',
                    )}
                >
                    <div className={cx('top-header-tablet__content__popup-installation')} id="popup-tablet__install">
                        <Button
                            className={cx(
                                'm-2',
                                '!px-0',
                                '!py-0',
                                '!ml-0',
                                'hover:shadow-none',
                                'focus:shadow-none',
                                'active:shadow-none',
                                'active:shadow-none',
                            )}
                            onClick={handleClickInstallApp}
                            icon={<DevicePhoneMobileIcon />}
                            iconProps={{ className: cx('w-[20px]', 'text-neutral-600', 'inline-block') }}
                            iconPosition="left"
                            variant="tertiary"
                            classNameText={cx('!text-neutral-700')}
                            id="btn-install__tablet"
                        >
                            <Typography>Download Apps</Typography>
                        </Button>
                    </div>
                    <div
                        className={cx(
                            'top-header-tablet__content--currency-language-changer-menu',
                            'flex',
                            'flex-wrap',
                            'flex-column',
                            'justify-end',
                            'gap-x-4',
                        )}
                    >
                        <SwitcherCurrency {...props} />
                        <SwitcherLanguage {...props} />
                    </div>
                </div>
            </div>
            <div className={cx('middle-header-tablet', 'tablet:border-b-[1.5px]', 'tablet:border-b-neutral-300', 'tablet:py-4')}>
                <div
                    className={cx(
                        'middle-header-tablet__wrapper',
                        'flex',
                        'flex-row',
                        'justify-between',
                        'gap-x-5',
                        'm-[0_auto]',
                        'tablet:max-w-[768px]',
                        'px-6',
                    )}
                >
                    <div className={cx('middle-header-tablet__burger-menu')}>
                        <Button
                            className={cx(
                                'my-2',
                                '!p-0',
                                '!mx-0',
                                'hover:shadow-none',
                                'focus:shadow-none',
                                'active:shadow-none',
                                'active:shadow-none',
                            )}
                            onClick={() => {
                                setOpenBurgerMenu(true);
                            }}
                            icon={<Bars3Icon />}
                            iconProps={{ className: cx('text-neutral-700', 'w-[24px]', 'h-[24px]') }}
                            iconOnly
                            variant="tertiary"
                            classNameText={cx('!text-neutral-700')}
                        />
                        {data && (
                            <Drawer
                                open={openBurgerMenu}
                                handleClose={() => setOpenBurgerMenu(false)}
                                position="left"
                                className={cx('tablet:max-desktop:w-[396px]')}
                                customButtonClose
                                backdrop
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
                        )}
                    </div>
                    <div className={cx('middle-header-tablet__logo', 'flex', 'items-center', 'cursor-pointer')}>
                        <Link href="/" legacyBehavior>
                            <a>
                                <Image
                                    styleContainer={{
                                        width: `${storeConfig?.logo_width || 74}px`,
                                        height: `${storeConfig?.logo_height || 34}px`,
                                        paddingTop: 0,
                                    }}
                                    className="middle-header-tablet__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                    alt={storeConfig.default_title}
                                    width={storeConfig?.logo_width || 74}
                                    height={storeConfig?.logo_height || 34}
                                    storeConfig={storeConfig}
                                    lazy={false}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={cx('middle-header-tablet__search')}>
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} deviceWidth={deviceWidth} />
                    </div>
                    <div className={cx('middle-header-tablet__statusicon')}>
                        <div className={cx('middle-header__statusicon', 'flex', 'flex-row', 'gap-x-1', 'justify-between')}>
                            <div className="notification">
                                <NotificationBell withLink />
                            </div>
                            <div id="header-shoppingBag-icon" className="shopping-bag">
                                <ShoppingBagIcon withLink storeConfig={storeConfig} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabletHeader;
