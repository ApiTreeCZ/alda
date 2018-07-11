import {CssBaseline, MuiThemeProvider, PaletteType} from '@material-ui/core';
import * as React from 'react';

import {AppFrame} from '../modules/common/components';
import {paletteType, savePaletteType, ThemeContext, ThemeContextType} from '../contexts';
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
                paletteType,
                pageContext: StylesContext.getPageContext(paletteType),
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
                const newPaletteType: PaletteType = !prevState.paletteType ? paletteType : prevState.paletteType === 'light' ? 'dark' : 'light';
                savePaletteType(newPaletteType);
                return {...prevState, paletteType: newPaletteType, pageContext: StylesContext.getPageContext(newPaletteType)};
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
