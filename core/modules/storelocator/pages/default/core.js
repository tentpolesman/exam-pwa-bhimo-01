import Layout from '@layout';
import { getStoreLocations } from '@core_modules/storelocator/services/graphql';
import Content from '@core_modules/storelocator/pages/default/components';

const PageStoreLocator = (props) => {
    const {
        t, pageConfig,
    } = props;
    const config = {
        title: t('storelocator:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('storelocator:title'),
        bottomNav: false,
    };
    const { data, loading } = getStoreLocations();

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                loading={loading}
                storeLocations={data && data.storeLocation && data.storeLocation.items}
                {...props}
            />
        </Layout>
    );
};

export default PageStoreLocator;
