import * as React from 'react';
import {Fragment} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Content, TopBar} from '../components';
import {Store} from '../Store';
import {ThemeAction, ThemeActionCreator} from '../actions';
import {ThemeStore} from '../stores';

interface OwnProps {}

interface ConnectedState {
    readonly theme: ThemeStore;
}

interface ConnectedDispatch extends ThemeAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps;

export class Container extends React.Component<Props> {
    handleOnChangeTheme = () => {
        const {
            theme: {themeOptions},
            changeThemeOptions,
        } = this.props;
        changeThemeOptions({...themeOptions, palette: {...themeOptions.palette, type: themeOptions.palette.type === 'dark' ? 'light' : 'dark'}});
    };

    render() {
        const {children, theme} = this.props;
        return (
            <Fragment>
                <TopBar
                    title={'ALDA'}
                    gitHubUrl={'https://github.com/ApiTreeCZ/alda'}
                    onChangeTheme={this.handleOnChangeTheme}
                    paletteType={theme.themeOptions.palette.type}
                />
                <Content>{children}</Content>
            </Fragment>
        );
    }
}

export const PageContainer = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({theme}: Store) => ({theme}),
    (dispatch: Dispatch): ConnectedDispatch => ThemeActionCreator(dispatch),
)(Container);
