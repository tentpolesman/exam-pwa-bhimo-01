import * as schemaProduct from '@core_modules/product/services/graphql/schema';

const getSSRProductProps = async ({ apolloClient, slug, storeConfig }) => {
    try {
        const props = {};

        const resProducts = await apolloClient.query({
            query: schemaProduct.getProduct(storeConfig),
            variables: { url: slug },
        });

        const products = resProducts?.data;
        props.products = products ?? null;

        return {
            props,
        };
    } catch (error) {
        return {};
    }
};

export default getSSRProductProps;
