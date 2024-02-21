import Backdrop from '@common_backdrop';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const CmsPage = (props) => {
    const {
        data, t, loading, error, storeConfig, onlyCms, ...other
    } = props;
    if (error) {
        return (
            <div className="alert m-15" severity="error">
                {t('common:error:fetchError')}
            </div>
        );
    }

    if (loading) return <Backdrop open={loading} />;
    if (onlyCms) return <CmsRenderer {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />;

    return (
        <div className="cms-container desktop:max-w-[1280px] min-h-[350px] desktop:px-10 tablet:max-w-[768px] tablet:px-6 mobile:px-4 my-0 mx-auto">
            <CmsRenderer applyProse {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />
        </div>
    );
};

export default CmsPage;
