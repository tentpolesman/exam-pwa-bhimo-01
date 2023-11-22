/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import CmsPage from '@core_modules/cms/pages/default';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Thumbor from '@common_image';
import Skeleton from '@common_skeleton';

const BannerSlider = dynamic(() => import('@core_modules/home/pages/default/components/Banner'));
const FeaturedProducts = dynamic(() => import('@core_modules/home/pages/default/components/FeaturedProducts'));
const CategoryList = dynamic(() => import('@core_modules/home/pages/default/components/CategoryList'));

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

    const logoUrl = `${props.storeConfig.secure_base_media_url}logo/${props.storeConfig.header_logo_src}`;

    let content = '';

    if (homePageConfig && useCmsPage && useCmsPage.enable) {
        content = (
            <>
                <CmsPage
                    onlyCms
                    slug={[useCmsPage.identifier]}
                    withLayoutHeader
                    withLayoutFooter
                    withCmsTitle={false}
                    {...other}
                    storeConfig={storeConfig}
                    pageConfig={cmsHome}
                />
            </>
        );
    } else {
        content = (
            <>
                <BannerSlider {...other} storeConfig={storeConfig} />
                <FeaturedProducts {...other} storeConfig={storeConfig} />
                <CategoryList {...other} storeConfig={storeConfig} />
            </>
        );
    }

    return (
        <div
            className={cx('swtpwa-home', 'w-full', 'h-full', 'overflow-x-hidden', {
                'p-0': useCms,
                'flex flex-col justify-center items-center pb-[30px]': !useCms,
            })}
        >
            {props.storeConfig && props.storeConfig.pwa && props.storeConfig.pwa.mobile_navigation !== 'burger_menu' && (
                <div className="sm:max-md:w-screen w-full flex justify-center bg-neutral-50">
                    <div className="absolute z-[99] left-[50%] -translate-x-[50%] hidden-desktop">
                        <Thumbor
                            className="mt-[25%] w-full h-full relative"
                            classContainer="!pt-[unset]"
                            src={logoUrl}
                            alt="logo"
                            width={100}
                            height={32}
                            storeConfig={storeConfig}
                        />
                    </div>
                </div>
            )}
            {content}
            <Skeleton width="100%" height={50} radius={5} duration={2} />
        </div>
    );
};

export default Content;
