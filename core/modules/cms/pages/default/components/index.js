import Backdrop from '@common_backdrop';
import Alert from '@material-ui/lab/Alert';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const CmsPage = (props) => {
    const {
        data, t, loading, error, storeConfig, onlyCms, ...other
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }

    if (loading) return <Backdrop open={loading} />;
    if (onlyCms) return <CmsRenderer {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />;

    return (
        <div className="cms-container xs:max-md:p-4 -m-[10px]">
            <CmsRenderer {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />
        </div>
    );
};

export default CmsPage;
