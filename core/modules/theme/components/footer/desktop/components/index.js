import dynamic from 'next/dynamic';

const FooterV1 = dynamic(() => import('@core_modules/theme/components/footer/desktop/components/v1'), { ssr: true });
// const FooterV2 = dynamic(() => import('@core_modules/theme/components/footer/desktop/components/v2'), { ssr: true });

const FooterView = (props) => {
    const {
        t, error, storeConfig,
    } = props;

    if (error) {
        return <div className="m-15 p-2 bg-red-500 text-neutral-white">{t('common:error:fetchError')}</div>;
    }

    let content = <></>;

    if (storeConfig?.pwa?.footer_version && storeConfig?.pwa?.footer_version === 'pwa_footer_v1') {
        content = <FooterV1 {...props} />;
    }

    // if (storeConfig?.pwa?.footer_version && storeConfig?.pwa?.footer_version === 'pwa_footer_v2') {
    //     content = <FooterV2 {...props} />;
    // }

    return content;
};

export default FooterView;
