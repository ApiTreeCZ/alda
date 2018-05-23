import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {PageAction, PageActionCreator} from '../actions';
import {AppFrame} from '../components';
import {Store} from '../Store';
import {PageContext, StylesContext} from '../styles/StylesContext';

// tslint:disable-next-line
const JssProvider = require('react-jss/lib/JssProvider').default;

export const getThemeOptions = (): ThemeOptions | undefined => {
    try {
        const find = localStorage.getItem('themeOptions');
        if (find === null) {
            return undefined;
        }
        return JSON.parse(find);
    } catch (err) {
        return undefined;
    }
};

export const saveThemeOptions = (theme: ThemeOptions) => {
    try {
        localStorage.setItem('themeOptions', JSON.stringify(theme));
    } catch (err) {
        // nothing...
    }
};

export const withMaterialUi = (BaseComponent: React.ComponentClass & {getInitialProps?(ctx: any): Promise<any>}) => {
    interface OwnProps {
        readonly pageContext: PageContext;
    }

    interface ConnectedState {
        readonly themeOptions: ThemeOptions;
    }

    interface ConnectedDispatch extends PageAction {}

    interface State {
        readonly prevProps?: OwnProps & ConnectedState;
        readonly pageContext?: PageContext;
    }

    type Props = ConnectedState & ConnectedDispatch & OwnProps;

    class Component extends React.Component<Props, State> {
        constructor(props: Props, context: any) {
            super(props, context);
            this.state = {};
        }

        static async getInitialProps(ctx: any) {
            if (BaseComponent.getInitialProps) {
                return await BaseComponent.getInitialProps(ctx);
            }
            return {};
        }

        static getDerivedStateFromProps(nextProps: Props, prevState: State) {
            if (typeof prevState.pageContext === 'undefined') {
                return {prevProps: nextProps, pageContext: nextProps.pageContext || StylesContext.getPageContext(nextProps.themeOptions)};
            }
            const {prevProps} = prevState;
            if (
                !nextProps.themeOptions.palette ||
                !prevProps ||
                !prevProps.themeOptions.palette ||
                nextProps.themeOptions.palette.type !== prevProps.themeOptions.palette.type
            ) {
                return {prevProps: nextProps, pageContext: StylesContext.updatePageContext(nextProps.themeOptions)};
            }
            return null;
        }

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            if (!this.state.pageContext) {
                return null;
            }
            const {
                pageContext: {jss, sheetsRegistry, generateClassName, sheetsManager, theme},
            } = this.state;
            return (
                <JssProvider jss={jss} registry={sheetsRegistry} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                        <CssBaseline />
                        <AppFrame>
                            <BaseComponent {...this.props} />
                        </AppFrame>
                    </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    return connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
        ({page: {themeOptions}}: Store) => ({themeOptions}),
        (dispatch: Dispatch): ConnectedDispatch => PageActionCreator(dispatch),
    )(Component);
};
