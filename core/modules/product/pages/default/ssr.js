import * as schemaProduct from '@core_modules/product/services/graphql/schema';

const getSSRProductProps = async ({ apolloClient, slug, storeConfig }) => {
    try {
        const resProducts = await apolloClient.query({
            query: schemaProduct.getProduct(storeConfig),
            variables: { url: slug },
        });

        const data = resProducts?.data ?? null;
        const bannerResult = [];
        if (data?.products?.items?.length > 0) {
            const item = data?.products?.items[0];
            if (item.media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                item.media_gallery.map((media) => {
                    bannerResult.push({
                        link: '#',
                        imageUrl: media.url,
                        videoUrl: media?.video_content || null,
                        imageAlt: media.label,
                    });
                });
            } else {
                bannerResult.push({
                    link: '#',
                    imageUrl: item.image.url,
                    videoUrl: '#',
                    imageAlt: item.image.label,
                });
            }
        }

        return {
            bannerResult,
        };
    } catch (error) {
        return {};
    }
};

export default getSSRProductProps;
