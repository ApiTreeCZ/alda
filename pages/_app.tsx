import Router from 'next/router';
import * as NProgress from 'nprogress';
import * as React from 'react';
import {compose} from 'react-apollo';
import {InjectedIntlProps} from 'react-intl';
import {Provider} from 'react-redux';

import {PageContainer} from '../client/containers';
import {createStore} from '../client/createStore';
import {withApolloProvider, withIntl, withMaterialUi} from '../client/with';

NProgress.configure({parent: '#loadingContent'});

Router.onRouteChangeStart = (_) => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

// tslint:disable-next-line
const withRedux = require('next-redux-wrapper').default;
// tslint:disable-next-line
const {Container} = require('next/app');
// tslint:disable-next-line
const App: any = require('next/app').default;

export interface AppProps extends InjectedIntlProps {}

class AldaApp extends App {
    static async getInitialProps({Component, ctx}: any) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }

    render() {
        const {Component, pageProps, store, intl} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <PageContainer {...pageProps} intl={intl}>
                        <Component />
                    </PageContainer>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(compose(withApolloProvider, withIntl, withMaterialUi)(AldaApp));
