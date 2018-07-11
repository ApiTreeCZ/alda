import {Theme} from '@material-ui/core/styles/createMuiTheme';
import {Palette, PaletteColor, PaletteColorOptions, PaletteOptions} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        palette: {
            custom: {
                green: PaletteColor;
                orange: PaletteColor;
                indigo: PaletteColor;
                brown: PaletteColor;
            }
        }
    }
}

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        custom: {
            green: PaletteColor;
            orange: PaletteColor;
            indigo: PaletteColor;
            brown: PaletteColor;
        }
    }

    interface PaletteOptions {
        custom: {
            green: PaletteColorOptions;
            orange: PaletteColorOptions;
            indigo: PaletteColorOptions;
            brown: PaletteColorOptions;
        }
    }
}
