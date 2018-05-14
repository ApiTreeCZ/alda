import * as React from 'react';
import {compose} from 'react-apollo';
import * as withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import * as NProgress from 'nprogress';
import {withApolloProvider, withIntl, withMaterialUi} from './with';
import {createStore} from './createStore';
import {PageContainer} from './containers';
import {InjectedIntlProps} from 'react-intl';

NProgress.configure({parent: '#loadingContent'});

Router.onRouteChangeStart = (_) => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export interface AppProps extends InjectedIntlProps {}

/**
 * Main boot of application, init Redux, Material-ui, etc.
 *
 */
export const app = (Component: React.ComponentType) =>
    withRedux(createStore)(
        compose(withApolloProvider, withIntl, withMaterialUi)((props) => (
            <PageContainer {...props}>
                <Component />
            </PageContainer>
        )),
    );
