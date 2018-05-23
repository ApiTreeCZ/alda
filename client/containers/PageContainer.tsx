import * as React from 'react';
import {Fragment} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {PageAction, PageActionCreator} from '../actions';
import {AppProps} from '../app';
import {Content, LeftMenu, TopBar} from '../components';
import {Store} from '../Store';
import {PageStore} from '../stores';

interface OwnProps extends AppProps {}

interface ConnectedState {
    readonly page: PageStore;
}

interface ConnectedDispatch extends PageAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps;

export class Container extends React.Component<Props> {
    handleOnChangeTheme = () => {
        const {
            page: {themeOptions},
            changeThemeOptions,
        } = this.props;
        changeThemeOptions({
            ...themeOptions,
            palette: {...themeOptions.palette, type: themeOptions.palette && themeOptions.palette.type === 'dark' ? 'light' : 'dark'},
        });
    };

    handleOnOpenLeftMenu = () => {
        this.props.openLeftMenu();
    };

    handleOnCloseLeftMenu = () => {
        this.props.closeLeftMenu();
    };

    render() {
        const {
            children,
            page,
            intl: {locale},
        } = this.props;

        if (!page.themeOptions.palette || !page.themeOptions.palette.type) {
            return null;
        }
        return (
            <Fragment>
                <TopBar
                    locale={locale}
                    gitHubUrl={'https://github.com/ApiTreeCZ/alda'}
                    onChangeTheme={this.handleOnChangeTheme}
                    paletteType={page.themeOptions.palette.type}
                    onClickOpenLeftMenu={this.handleOnOpenLeftMenu}
                />
                <div id={'loadingContent'} />
                <LeftMenu open={page.isOpenLeftMenu} onClose={this.handleOnCloseLeftMenu} />
                <Content>{children}</Content>
            </Fragment>
        );
    }
}

export const PageContainer = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({page}: Store) => ({page}),
    (dispatch: Dispatch): ConnectedDispatch => PageActionCreator(dispatch),
)(Container);
