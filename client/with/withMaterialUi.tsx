import * as React from 'react';
import {connect} from 'react-redux';
import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {PageContext, StylesContext} from '../styles/StylesContext';
import {AppFrame} from '../components';
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import {PageAction, PageActionCreator} from '../actions';
import {Store} from '../Store';
import {Dispatch} from 'redux';
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
                nextProps.themeOptions.palette.type !== prevProps.themeOptions.palette.type ||
                nextProps.themeOptions.direction !== prevProps.themeOptions.direction
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

    // Solve an isolation issue with hoist-non-react-statics.
    // TODO: remove once hoist-non-react-statics has been updated.
    // SEE: https://github.com/mui-org/material-ui/blob/v1-beta/docs/src/modules/components/AppWrapper.js
    // tslint:disable-next-line
    class Wrapper extends React.Component<Props> {
        static async getInitialProps(ctx: any) {
            if (BaseComponent.getInitialProps) {
                return await BaseComponent.getInitialProps(ctx);
            }
            return {};
        }
        render() {
            return <Component {...this.props} />;
        }
    }

    return connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
        ({page: {themeOptions}}: Store) => ({themeOptions}),
        (dispatch: Dispatch): ConnectedDispatch => PageActionCreator(dispatch),
    )(Wrapper);
};
