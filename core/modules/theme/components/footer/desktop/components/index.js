import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const FooterView = (props) => {
    const {
        data, t, loading, error, storeConfig,
    } = props;

    if (error) {
        return <div className="m-15 p-2 bg-red-500 text-neutral-white">{t('common:error:fetchError')}</div>;
    }

    return (
        <div className="cms-container wrapper-footer">
            {!loading ? <CmsRenderer content={data.cmsBlocks.items[0].content} storeConfig={storeConfig} /> : null}
        </div>
    );
};

export default FooterView;
