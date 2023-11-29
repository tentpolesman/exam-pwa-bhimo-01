/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import Image from '@common_image';
import Menu from '@core_modules/theme/components/header/desktop/components/v1/mcategory';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductCompareIcon = dynamic(() => import('@core_modules/catalog/plugins/ProductCompare'));
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'));
const NotificationBell = dynamic(() => import('@plugin_notificationbell'));
// const DesktopInstallApp = dynamic(() => import('@core_modules/theme/components/custom-install-popup/desktop'), { ssr: false });
const GoogleMaps = dynamic(() => import('@common_googlemaps'), { ssr: false });
const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/desktop/components/autocomplete'), { ssr: false });
const TopMenu = dynamic(() => import('@core_modules/theme/components/header/desktop/components/mtop'), { ssr: false });

import RangeSlider from '@common_rangeslider';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';

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

    const [mapPosition, setMapPosition] = React.useState({
        lat: parseFloat(0),
        lng: parseFloat(0),
    });

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const [priceRange, setPriceRange] = React.useState([0, 0]);

    const [price, setPrice] = React.useState([0, 100000]);

    console.log('priceRange', priceRange);
    console.log('price', price);

    return (
        <div id="header-inner">
            <div className="flex flex-row header-top">
                <main style={{ width: '97%' }}>
                    {/* {enablePopupInstallation ? <DesktopInstallApp appName={appName} installMessage={installMessage} /> : null} */}
                    <TopMenu t={t} isLogin={isLogin} data={customer} handleLogout={handleLogout} app_cookies={app_cookies} />
                </main>
            </div>
            <main style={{ width: '100%', maxWidth: 'unset' }}>
                <div className="header-main">
                    <div className="header-middle">
                        <div className="header-middle__left">
                            <div className="box header-middle__logo">
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
                        </div>
                        <div className="header-middle__right">
                            <div className="box">
                                <div className="header-middle__icons">
                                    <div className="notification">
                                        <NotificationBell withLink />
                                    </div>
                                    {modules.productcompare.enabled && (
                                        <div className="shopping-bag">
                                            <ProductCompareIcon withLink isLogin={isLogin} />
                                        </div>
                                    )}
                                    <div id="header-shoppingBag-icon" className="shopping-bag">
                                        <ShoppingBagIcon withLink storeConfig={storeConfig} />
                                    </div>
                                </div>
                                <div className="header-middle__search">
                                    <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-middle">
                        <div id="submenu" className="header-middle__center">
                            <div className="flex flex-row menu-category">
                                <div className="xs:basis-full menu-middle">
                                    {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <GoogleMaps
                        // gmapKey="AIzaSyDNnh0yPa2AS1_9rGdM_4UA_eBSQcQA5VU"
                        gmapKey="AIzaSyBWQtbcH4fW9emnyYPAuFiZ6wVkV_SzmzE"
                        // geocodingKey="AIzaSyBWQtbcH4fW9emnyYPAuFiZ6wVkV_SzmzE"
                        // geocodingKey="AIzaSyDNnh0yPa2AS1_9rGdM_4UA_eBSQcQA5VU"
                        // geocodingKey={geocodingKey}
                        // markers={updatedItems}
                        // defaultZoom={map_zoom}
                        mapPosition={mapPosition}
                        dragMarkerDone={handleDragPosition}
                        // markerIcon={storeConfig.secure_base_media_url}
                        // useCustomMarkerIcon={storeConfig.secure_base_media_url !== ''}
                        // markerDraggable={map_draggable}
                        // formik={formik}
                        containerStyle={{
                            width: '100%',
                            height: '200px',
                            marginTop: '1rem',
                        }}
                        mode="map-only"
                    />
                </div> */}
                <div>{/* <RangeSlider label="Price" maxValue={120} value={price} onChange={setPriceRange} storeConfig={storeConfig} /> */}</div>
            </main>
            <style jsx>
                {`
                    .header-main {
                        max-width: 1440px;
                        width: 97%;
                        margin: 0 auto;
                    }
                    @media (min-width: 768px) {
                        #header-inner {
                            ${storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header
                                ? 'position: fixed;'
                                : 'position: relative; z-index: 1100;'}
                            width: 100%;
                            background: white;
                            z-index: 3;
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
};

export default ViewTopNavigation;
