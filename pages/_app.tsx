import Router from 'next/router';
import * as NProgress from 'nprogress';
import * as React from 'react';
import {compose} from 'react-apollo';
import {Provider} from 'react-redux';

import {createStore} from '../client/createStore';
import {withApolloProvider, withIntl, withMaterialUi} from '../client/with';

NProgress.configure({parent: '#loadingContent'});

Router.onRouteChangeStart = (_) => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

// tslint:disable-next-line
const {default: withRedux} = require('next-redux-wrapper');
// tslint:disable-next-line
const {Container, default: App} = require('next/app');

class AldaApp extends App {
    static async getInitialProps({Component, ctx}: any) {
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            },
        };
    }

    render() {
        const {Component, store, pageProps} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    {/* I can't use material-ui Layout (PageContainer) in _app.js */}
                    {/* FIXME: https://github.com/zeit/next.js/pull/4288 */}
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(
    compose(
        withApolloProvider,
        withIntl,
        withMaterialUi,
    )(AldaApp),
);
