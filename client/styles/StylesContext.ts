import {createGenerateClassName, createMuiTheme, jssPreset, PaletteType} from '@material-ui/core';
import {CustomPalette} from './CustomPalette';

// tslint:disable-next-line
const {create, SheetsRegistry} = require('jss');

declare const process: any;
declare const global: any;

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins]});

const createPageContext = (paletteType: PaletteType) => ({
    jss,
    theme: createMuiTheme({palette: CustomPalette[paletteType]}),
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
    getPageContext(paletteType: PaletteType) {
        // Make sure to create a new store for every server-side request so that data
        // isn't shared between connections (which would be bad)
        if (!process.browser) {
            return createPageContext(paletteType);
        }

        // Reuse context on the client-side
        if (!global.__INIT_MATERIAL_UI__ || global.__INIT_MATERIAL_UI__.theme.palette.type !== paletteType) {
            global.__INIT_MATERIAL_UI__ = createPageContext(paletteType);
        }
        return global.__INIT_MATERIAL_UI__;
    },

    updatePageContext(paletteType: PaletteType) {
        const pageContext = {
            ...global.__MUI_PAGE_CONTEXT__,
            theme: createMuiTheme(createMuiTheme({palette: CustomPalette[paletteType]})),
        };
        global.__MUI_PAGE_CONTEXT__ = pageContext;

        return pageContext;
    },
};
