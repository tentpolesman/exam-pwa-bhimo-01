/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
// import Thumbor from '@common_image';
import CmsPage from '@core_modules/cms/pages/default/core';
import cx from 'classnames';

import Layout from '@layout';

const Content = (props) => {
    let useCmsPage = {};

    const {
        cmsHome, homePageConfig, storeConfig: config, ...other
    } = props;

    let storeConfig = config;
    const useCms = storeConfig?.pwa?.use_cms_page_enable;

    if (homePageConfig && homePageConfig.pwa) {
        storeConfig = {
            ...config,
            pwa: {
                ...config.pwa,
                ...homePageConfig.pwa,
            },
        };
        useCmsPage = {
            enable: storeConfig.pwa.use_cms_page_enable,
            identifier: storeConfig.pwa.use_cms_page_identifier,
        };
    }

    // const logoUrl = `${props.storeConfig.secure_base_media_url}logo/${props.storeConfig.header_logo_src}`;

    let content = '';

    if (homePageConfig && useCmsPage && useCmsPage.enable) {
        content = (
            <CmsPage
                slug={[useCmsPage.identifier]}
                withLayoutHeader
                withLayoutFooter
                withCmsTitle={false}
                {...other}
                storeConfig={storeConfig}
                pageConfig={cmsHome}
            />
        );
    } else {
        const Config = {
            title: storeConfig && storeConfig.store_name ? storeConfig.store_name : 'PWA Homepage',
            headerTitle: storeConfig && storeConfig.store_name ? storeConfig.store_name : 'PWA Homepage',
            bottomNav: false,
            header: 'relative', // available values: "absolute", "relative", false (default)
        };
        content = (
            <Layout {...props} pageConfig={Config} isCms={false} isHomepage>
                <>You need to develop your own non-CMS component for Homepage.</>
            </Layout>
        );
    }

    return (
        <div
            className={cx('swtpwa-home', 'w-full', 'h-full', 'overflow-x-hidden', {
                'p-0': useCms,
                'flex flex-col justify-center items-center pb-[30px]': !useCms,
            })}
        >
            {content}
        </div>
    );
};

export default Content;
