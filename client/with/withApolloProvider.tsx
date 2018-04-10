import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {onError} from 'apollo-link-error';
import {ApolloProvider} from 'react-apollo';
import {InMemoryCache} from 'apollo-client-preset';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import * as fetch from 'isomorphic-fetch';
import {Store} from '../Store';

declare const process: any;

// tslint:disable-next-line
const createErrorLink = (_: ApolloClient<any>, _dispatch: Dispatch<Store>) =>
    onError(() => {
        // TODO handle GraphQL errors
    });

const client = new ApolloClient({
    connectToDevTools: process.browser,
    link: new HttpLink({uri: '/api/graphql', credentials: 'same-origin', fetch}),
    ssrMode: !process.browser,
    cache: new InMemoryCache(),
});

const createClient = (dispatch: Dispatch<Store>) => {
    client.link = createErrorLink(client, dispatch).concat(client.link as any) as any;
    return client;
};

export const withApolloProvider = (Page: React.ComponentClass & {getInitialProps?: (ctx) => any}): React.ComponentClass<any> => {
    interface ConnectedDispatch {
        readonly dispatch: Dispatch<Store>;
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
