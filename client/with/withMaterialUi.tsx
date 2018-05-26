import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';

import {AppFrame} from '../components';
import {saveThemeOptions, ThemeContext, ThemeContextType, themeOptions} from '../contexts';
import {PageContext, StylesContext} from '../styles/StylesContext';

// tslint:disable-next-line
const JssProvider = require('react-jss/lib/JssProvider').default;

export const withMaterialUi = (BaseComponent: React.ComponentClass & {getInitialProps?(ctx: any): Promise<any>}) => {
    interface Props {}

    interface State extends ThemeContextType {
        readonly pageContext: PageContext;
    }

    class Component extends React.Component<Props, State> {
        constructor(props: Props, context: any) {
            super(props, context);
            this.state = {
                themeOptions,
                pageContext: StylesContext.getPageContext(themeOptions),
                toggleTheme: this.toggleTheme,
            };
        }

        static async getInitialProps(ctx: any) {
            if (BaseComponent.getInitialProps) {
                return await BaseComponent.getInitialProps(ctx);
            }
            return {};
        }

        toggleTheme = () => {
            this.setState((prevState) => {
                const newThemeOptions: ThemeOptions = !prevState.themeOptions.palette
                    ? themeOptions
                    : {palette: {type: prevState.themeOptions.palette.type === 'light' ? 'dark' : 'light'}};
                saveThemeOptions(newThemeOptions);
                return {...prevState, themeOptions: newThemeOptions, pageContext: StylesContext.getPageContext(newThemeOptions)};
            });
        };

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
                            <ThemeContext.Provider value={this.state}>
                                <BaseComponent {...this.props} />
                            </ThemeContext.Provider>
                        </AppFrame>
                    </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    return Component;
};
