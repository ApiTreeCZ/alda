import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';

const getThemeOptions = (): ThemeOptions => {
    const defaultTheme: ThemeOptions = {
        palette: {
            type: 'dark',
        },
    };
    try {
        const find = localStorage.getItem('themeOptions');
        if (find === null) {
            return defaultTheme;
        }
        return JSON.parse(find);
    } catch (err) {
        return defaultTheme;
    }
};

const saveThemeOptions = (theme: ThemeOptions) => {
    try {
        localStorage.setItem('themeOptions', JSON.stringify(theme));
    } catch (err) {
        // nothing...
    }
};

interface ThemeContextType {
    readonly themeOptions: ThemeOptions;
    readonly toggleTheme: () => void;
}

const themeOptions: ThemeOptions = getThemeOptions();

const ThemeContext = React.createContext<ThemeContextType>({
    themeOptions,
    toggleTheme: () => {
        // declaration in constructor with state change
    },
});

export {getThemeOptions, saveThemeOptions, themeOptions, ThemeContextType, ThemeContext};
