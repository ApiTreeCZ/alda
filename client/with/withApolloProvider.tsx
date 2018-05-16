import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {ErrorResponse} from 'apollo-link-error';
import * as fetch from 'isomorphic-fetch';

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

let client = null;

const createClient = (dispatch: Dispatch) => {
    if (!client) {
        client = new ApolloClient({
            uri: '/api/graphql',
            fetchOptions: {credentials: 'same-origin', fetch},
            onError: onError(dispatch),
        });
    }
    return client;
};

export const withApolloProvider = (Page: React.ComponentClass & {getInitialProps?: (ctx) => any}): React.ComponentClass<any> => {
    interface ConnectedDispatch {
        readonly dispatch: Dispatch;
    }

    class PageWithApollo extends React.Component<any> {
        static async getInitialProps(ctx: any) {
            if (Page.getInitialProps) {
                return Page.getInitialProps(ctx);
            }
            return {};
        }

        render() {
            const {dispatch, ...props} = this.props;
            return (
                <ApolloProvider client={createClient(dispatch)}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }

    return connect<{}, ConnectedDispatch, {}>(() => ({}), (dispatch) => ({dispatch}))(PageWithApollo);
};
