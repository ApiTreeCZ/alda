import * as React from 'react';
import {Fragment} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {AppProps} from '../../pages/_app';
import {PageAction, PageActionCreator} from '../actions';
import {Content, LeftMenu, TopBar} from '../components';
import {Store} from '../Store';

interface OwnProps extends AppProps {}

interface ConnectedState {
    readonly isOpenLeftMenu: boolean;
}

interface ConnectedDispatch extends PageAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps;

export class Container extends React.Component<Props> {
    handleOnOpenLeftMenu = () => {
        this.props.openLeftMenu();
    };

    handleOnCloseLeftMenu = () => {
        this.props.closeLeftMenu();
    };

    render() {
        const {
            isOpenLeftMenu,
            children,
            intl: {locale},
        } = this.props;

        return (
            <Fragment>
                <TopBar locale={locale} gitHubUrl={'https://github.com/ApiTreeCZ/alda'} onClickOpenLeftMenu={this.handleOnOpenLeftMenu} />
                <div id={'loadingContent'} />
                <LeftMenu open={isOpenLeftMenu} onClose={this.handleOnCloseLeftMenu} />
                <Content>{children}</Content>
            </Fragment>
        );
    }
}

export const PageContainer = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({page: {isOpenLeftMenu}}: Store) => ({isOpenLeftMenu}),
    (dispatch: Dispatch): ConnectedDispatch => PageActionCreator(dispatch),
)(Container);
