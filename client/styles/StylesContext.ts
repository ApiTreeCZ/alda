import {createMuiTheme, jssPreset, PaletteType} from 'material-ui';
import {createGenerateClassName} from 'material-ui/styles';

// tslint:disable-next-line
const {create, SheetsRegistry} = require('jss');

declare const process: any;
declare const global: any;

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins]});

const createPageContext = (paletteType: PaletteType) => {
    return {
        jss,
        theme: createMuiTheme({palette: {type: paletteType}}),
        // theme: getTheme(palette),
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        generateClassName: createGenerateClassName({productionPrefix: 'j'}),
    };
};

export const StylesContext = {
    getPageContext(paletteType: PaletteType) {
        // Make sure to create a new store for every server-side request so that data
        // isn't shared between connections (which would be bad)
        if (!process.browser) {
            return createPageContext(paletteType);
        }

        // Reuse context on the client-side
        if (!global.__INIT_MATERIAL_UI__) {
            global.__INIT_MATERIAL_UI__ = createPageContext(paletteType);
        }
        return global.__INIT_MATERIAL_UI__;
    },
};
