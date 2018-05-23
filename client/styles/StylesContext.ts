import {createGenerateClassName, createMuiTheme, jssPreset} from '@material-ui/core';
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

// tslint:disable-next-line
const {create, SheetsRegistry} = require('jss');

declare const process: any;
declare const global: any;

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins]});

const createPageContext = (themeOptions: ThemeOptions) => ({
    jss,
    theme: createMuiTheme(themeOptions),
    // theme: getTheme(palette),
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName({productionPrefix: 'j'}),
});

export interface PageContext {
    readonly jss: any;
    readonly sheetsRegistry: any;
    readonly generateClassName: any;
    readonly sheetsManager: any;
    readonly theme: any;
}

export const StylesContext = {
    getPageContext(themeOptions: ThemeOptions) {
        // Make sure to create a new store for every server-side request so that data
        // isn't shared between connections (which would be bad)
        if (!process.browser) {
            return createPageContext(themeOptions);
        }

        // Reuse context on the client-side
        if (
            !global.__INIT_MATERIAL_UI__ ||
            !themeOptions.palette ||
            !themeOptions.palette.type ||
            global.__INIT_MATERIAL_UI__.theme.palette.type !== themeOptions.palette.type
        ) {
            global.__INIT_MATERIAL_UI__ = createPageContext(themeOptions);
        }
        return global.__INIT_MATERIAL_UI__;
    },

    updatePageContext(themeOptions: ThemeOptions) {
        const pageContext = {
            ...global.__MUI_PAGE_CONTEXT__,
            theme: createMuiTheme(createMuiTheme(themeOptions)),
        };
        global.__MUI_PAGE_CONTEXT__ = pageContext;

        return pageContext;
    },
};
