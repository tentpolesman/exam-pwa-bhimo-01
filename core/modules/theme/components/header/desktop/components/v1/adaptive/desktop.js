/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import cx from 'classnames';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react';

import Button from '@common_button';
import Image from '@common_image';
import Popover from '@common_popover';
import Typography from '@common_typography';
import config from '@config';

import Cookies from 'js-cookie';
import TagManager from 'react-gtm-module';

import DevicePhoneMobileIcon from '@heroicons/react/24/solid/DevicePhoneMobileIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';

const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/desktop/components/autocomplete'), { ssr: false });
const Menu = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v1/mcategory'), { ssr: false });
const ProductCompareIcon = dynamic(() => import('@core_modules/catalog/plugins/ProductCompare'), { ssr: true });
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'), { ssr: true });
const NotificationBell = dynamic(() => import('@plugin_notificationbell'), { ssr: true });
const SwitcherCurrency = dynamic(() => import('@common_currency'), { ssr: false });
const SwitcherLanguage = dynamic(() => import('@common_language'), { ssr: false });

const DesktopHeader = (props) => {
    const { t, storeConfig, isLogin, setValue, handleSearch, dataVesMenu, loadingVesMenu, vesMenuConfig, handleLogout, deviceWidth } = props;

    const { modules } = config;
    // const adminId = Cookies.get('admin_id');
    const router = useRouter();

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

    const [open, setOpen] = React.useState(false);
    const PopoverContent = () => {
        return (
            <ul className={cx('currency-list__wrapper')}>
                <li
                    key={0}
                    className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}
                    onClick={() => router.push('/customer/account')}
                >
                    <Typography className={cx('currency-list__text', 'text-neutral-700')}>My Account</Typography>
                </li>
                <li
                    key={0}
                    className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}
                    onClick={() => router.push('/wishlist')}
                >
                    <Typography className={cx('currency-list__text', 'text-neutral-700')}>My Wish List</Typography>
                </li>
                <li
                    key={0}
                    className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}
                    onClick={() => router.push('/catalog/product_compare')}
                >
                    <Typography className={cx('currency-list__text', 'text-neutral-700')}>Compare Products</Typography>
                </li>
                <li
                    key={0}
                    className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}
                    onClick={() => handleLogout()}
                >
                    <Typography className={cx('currency-list__text', 'text-primary-700')}>Log Out</Typography>
                </li>
            </ul>
        );
    };

    return (
        <div
            className={cx(
                'desktop-header',
                'mobile:max-desktop:hidden',
                'transition-transform',
                'delay-300',
                'duration-500',
                'ease-in-out',
                'shadow-md',
                {
                    'hidden-this-desktop': deviceWidth < 1200,
                },
            )}
        >
            <div
                id="top-header"
                className={cx('top-header', 'mobile:max-desktop:hidden', 'tablet:border-b-[1.5px]', 'tablet:border-b-neutral-300', 'py-[1px]')}
            >
                <div
                    id="top-header__content"
                    className={cx('top-header__content', 'grid grid-cols-[75%_25%]', 'tablet:max-w-[768px] desktop:max-w-[1200px]', 'm-[0_auto]')}
                >
                    <div className={cx('top-header__content__popup-installation')} id="popup-desktop__install">
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
                            id="btn-install"
                        >
                            <Typography>Download Apps</Typography>
                        </Button>
                    </div>
                    <div
                        className={cx(
                            'top-header__content--currency-language-changer-menu',
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
            <div
                className={cx('middle-header', 'mobile:max-desktop:hidden', 'tablet:border-b-[1.5px]', 'tablet:border-b-neutral-300', 'tablet:py-4')}
            >
                <div
                    className={cx('middle-header__wrapper', 'm-[0_auto]', 'grid', 'grid-cols-[1fr_2fr_1fr]', 'desktop:max-w-[1200px]', 'm-[0_auto]')}
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
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} deviceWidth={deviceWidth} />
                    </div>
                    <div className={cx('middle-header__statusicon', 'grid', 'grid-cols-[5fr_5fr]')}>
                        <div className={cx('middle-header__statusicon__left-section', 'grid', 'grid-cols-3')}>
                            <div className={cx('notification')}>
                                <NotificationBell withLink />
                            </div>
                            {modules.productcompare.enabled && (
                                <div className={cx('product-compare')}>
                                    <ProductCompareIcon withLink isLogin={isLogin} />
                                </div>
                            )}
                            <div id="header-shoppingBag-icon" className={cx('shopping-bag')}>
                                <ShoppingBagIcon withLink storeConfig={storeConfig} />
                            </div>
                        </div>
                        <div className={cx('middle-header__statusicon__right-section', 'border-l-[1.5px]', 'border-l-neutral-300')}>
                            <div
                                className={cx(
                                    'middle-header__statusicon__right-section__account',
                                    'pl-2',
                                    'mt-3',
                                    'hover:cursor-pointer',
                                    'flex',
                                    'justify-end',
                                )}
                            >
                                {isLogin ? (
                                    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                        <Link href="/customer/account">
                                            <Popover
                                                content={<PopoverContent />}
                                                open={open}
                                                setOpen={setOpen}
                                                className="top-[80%]"
                                                contentClassName="rounded-none"
                                            >
                                                <div className="popover-children">
                                                    <UserIcon className={cx('w-[24px]', 'text-neutral-600', 'inline-block')} />
                                                    <Typography variant="bd-2b" className={cx('inline-block', 'pl-2', '!text-primary-700')}>
                                                        {/* {customer.firstname} */}
                                                        Hi, Fakhri !
                                                    </Typography>
                                                </div>
                                            </Popover>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href="/customer/account/login">
                                        <UserIcon className={cx('w-[24px]', 'text-neutral-600', 'inline-block')} />
                                        <Typography variant="bd-2b" className={cx('inline-block', 'pl-2')}>
                                            {t('common:menu:sign')}/{t('common:menu:register')}
                                        </Typography>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('bottom-header', 'tablet:max-w-[768px] desktop:max-w-[1200px]', 'm-[0_auto]', 'mobile:max-desktop:hidden')}>
                <div className="flex flex-row menu-category">
                    <div className="xs:basis-full menu-middle">
                        {loadingVesMenu ? null : <Menu vesMenuConfig={vesMenuConfig} data={dataVesMenu} storeConfig={storeConfig} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopHeader;
