import * as React from 'react';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {PageAction, PageActionCreator} from '../actions';
import {AppFrame, Content, LeftMenu, TopBar} from '../components';
import {Store} from '../Store';

interface OwnProps {}

interface ConnectedState {
    readonly isOpenLeftMenu: boolean;
}

interface ConnectedDispatch extends PageAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps & InjectedIntlProps;

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
            <AppFrame>
                <TopBar locale={locale} gitHubUrl={'https://github.com/ApiTreeCZ/alda'} onClickOpenLeftMenu={this.handleOnOpenLeftMenu} />
                <div id={'loadingContent'} />
                <LeftMenu open={isOpenLeftMenu} onClose={this.handleOnCloseLeftMenu} />
                <Content>{children}</Content>
            </AppFrame>
        );
    }
}

export const PageContainer = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({page: {isOpenLeftMenu}}: Store) => ({isOpenLeftMenu}),
    (dispatch: Dispatch): ConnectedDispatch => PageActionCreator(dispatch),
)(injectIntl<OwnProps>(Container as any));
