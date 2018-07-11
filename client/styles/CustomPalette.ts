import {PaletteOptions} from '@material-ui/core/styles/createPalette';

const light = {
    type: 'light',
    primary: {
        main: '#007985',
        light: '#4ca8b5',
        dark: '#004d58',
        contrastText: '#fff',
    },
    secondary: {
        main: '#00a651',
        light: '#54d97f',
        dark: '#007625',
        contrastText: '#fff',
    },
    custom: {
        green: {
            main: '#4caf50',
            light: '#80e27e',
            dark: '#087f23',
            contrastText: '#fff',
        },
        orange: {
            main: '#ff9800',
            light: '#ffc947',
            dark: '#c66900',
            contrastText: '#000',
        },
        indigo: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
            contrastText: '#fff',
        },
        brown: {
            main: '#795548',
            light: '#a98274',
            dark: '#4b2c20',
            contrastText: '#fff',
        },
    },
    background: {
        default: '#f1f1f1',
    },
} as PaletteOptions;

const dark = {
    type: 'dark',
    primary: {
        main: '#007985',
        light: '#4ca8b5',
        dark: '#004d58',
        contrastText: '#fff',
    },
    secondary: {
        main: '#00a651',
        light: '#54d97f',
        dark: '#007625',
        contrastText: '#fff',
    },
    custom: {
        green: {
            main: '#4caf50',
            light: '#80e27e',
            dark: '#087f23',
            contrastText: '#fff',
        },
        orange: {
            main: '#ff9800',
            light: '#ffc947',
            dark: '#c66900',
            contrastText: '#000',
        },
        indigo: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
            contrastText: '#fff',
        },
        brown: {
            main: '#795548',
            light: '#a98274',
            dark: '#4b2c20',
            contrastText: '#fff',
        },
    },
} as PaletteOptions;

export const CustomPalette = {
    light,
    dark,
};
