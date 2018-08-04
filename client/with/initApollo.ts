import {ApolloClient, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';

import {setContext} from 'apollo-link-context';
import * as fetch from 'isomorphic-unfetch';

declare const global: any;
declare const process: any;

let apolloClient: ApolloClient<any>;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch;
}

const create = (initialState: any, {getToken}: {getToken: () => string}, req?: any) => {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const httpLink = createHttpLink({
        uri: `${baseUrl}/graphql`,
        credentials: 'same-origin',
    });

    const authLink = setContext((_, {headers}) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const cache = new InMemoryCache().restore(initialState || {});

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(httpLink),
        cache,
    });
};

export const initApollo = (initialState: any, options: {getToken: () => string}, req?: any) => {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options, req);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options, req);
    }

    return apolloClient;
};
