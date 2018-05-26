import ApolloClient from 'apollo-boost';
import {ErrorResponse} from 'apollo-link-error';
import * as fetch from 'isomorphic-fetch';
import {Context} from 'next/document';
import * as React from 'react';
import {ApolloProvider} from 'react-apollo';
import {Dispatch} from 'react-redux';

declare const process: any;
declare const global: any;

const onError = (_: Dispatch) => (errorObj: ErrorResponse) => {
    // TODO - implement handle errors
    // tslint:disable-next-line
    console.log('errorObj: ', errorObj);
};

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch;
}

let client: ApolloClient<any>;

const createClient = (dispatch: Dispatch) => {
    if (!client) {
        client = new ApolloClient({
            uri: '/graphql',
            fetchOptions: {credentials: 'same-origin', fetch},
            onError: onError(dispatch),
        });
    }
    return client;
};

export const withApolloProvider = (Page: React.ComponentClass & {getInitialProps?: (ctx: Context) => any}): React.ComponentClass<any> => {
    return class PageWithApollo extends React.Component<any> {
        static async getInitialProps(ctx: any) {
            if (Page.getInitialProps) {
                return Page.getInitialProps(ctx);
            }
            return {};
        }

        render() {
            return (
                <ApolloProvider client={createClient(this.props.store.dispatch)}>
                    <Page {...this.props} />
                </ApolloProvider>
            );
        }
    };
};
