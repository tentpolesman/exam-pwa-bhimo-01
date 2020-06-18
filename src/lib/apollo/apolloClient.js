/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import fetch from 'isomorphic-unfetch';
import { graphqlEndpoint, HOST } from '@root/swift.config.js';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { removeCartId } from '@helpers/cartId';
import { removeIsLoginFlagging } from '@helpers/auth';
import getConfig from 'next/config';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [],
        },
    },
});

const uri = graphqlEndpoint[publicRuntimeConfig.appEnv] || graphqlEndpoint.dev;

const uriInternal = `${HOST[publicRuntimeConfig.appEnv] || HOST.dev}/graphql`;
console.log(publicRuntimeConfig.appEnv);
console.log(uriInternal);
// handle if token expired
const logoutLink = onError((err) => {
    const { graphQLErrors } = err;
    if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].status === 401 && typeof window !== 'undefined') {
        removeCartId();
        removeIsLoginFlagging();
        // window.location.href = '/customer/account/login';
    }
});

const link = new RetryLink().split(
    (operation) => operation.getContext().request === 'internal',
    new HttpLink({
        uri: uriInternal, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
    }),
    new HttpLink({
        uri, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
    }),
);

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: logoutLink.concat(link),
        cache: new InMemoryCache({ fragmentMatcher }).restore(initialState),
        connectToDevTools: true,
        resolvers: {},
    });
}
