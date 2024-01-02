import { getCmsBlocks, categories } from '@core_modules/theme/services/graphql/schema';
import { getStoreName, getCurrencySchema } from '@core_modules/setting/services/graphql/schema';
import graphRequestClear from '@graphql_ssr';
import { gql } from '@apollo/client';

const layoutStoreConfigSchema = (storeConfigExtra) => gql`
        {
            storeConfig {
                pwa {
                    footer_version
                    ${storeConfigExtra}
                }
            }
        }
    `;

const getSSRProps = async ({ apolloClient, storeConfigExtra = '' }) => {
    // get cms page
    let storeConfig = await graphRequestClear(layoutStoreConfigSchema(storeConfigExtra));
    storeConfig = storeConfig?.storeConfig ?? null;

    if (storeConfig) {
        // header
        await apolloClient.query({
            query: categories,
        });
        // header setting currency
        await apolloClient.query({
            query: getCurrencySchema,
        });
        // header setting store
        await apolloClient.query({
            query: getStoreName,
        });

        // news letter
        await apolloClient.query({
            query: getCmsBlocks,
            variables: { identifiers: 'weltpixel_newsletter_v5' },
        });

        // footer
        await apolloClient.query({
            query: getCmsBlocks,
            variables: { identifiers: [storeConfig?.pwa?.footer_version] },
        });

        return {
            storeConfig,
        };
    }

    return {};
};

export default getSSRProps;
