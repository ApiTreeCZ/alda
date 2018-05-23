import * as withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import * as NProgress from 'nprogress';
import * as React from 'react';
import {compose} from 'react-apollo';
import {InjectedIntlProps} from 'react-intl';
import {PageContainer} from './containers';
import {createStore} from './createStore';
import {withApolloProvider, withIntl, withMaterialUi} from './with';

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
        compose(withApolloProvider, withIntl, withMaterialUi)((props: any) => (
            <PageContainer {...props}>
                <Component />
            </PageContainer>
        )),
    );
