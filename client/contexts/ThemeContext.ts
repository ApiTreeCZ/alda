import * as React from 'react';
import {PaletteType} from '@material-ui/core';

const getPaletteType = (): PaletteType => {
    const defaultTheme: PaletteType = 'dark';
    try {
        const find = localStorage.getItem('paletteType');
        if (find === null) {
            return defaultTheme;
        }
        return JSON.parse(find);
    } catch (err) {
        return defaultTheme;
    }
};

const savePaletteType = (type: PaletteType) => {
    try {
        localStorage.setItem('paletteType', JSON.stringify(type));
    } catch (err) {
        // nothing...
    }
};

export interface ThemeContextType {
    readonly paletteType: PaletteType;
    readonly toggleTheme: () => void;
}

const paletteType: PaletteType = getPaletteType();

const ThemeContext = React.createContext<ThemeContextType>({
    paletteType,
    toggleTheme: () => {
        // declaration in constructor with state change
    },
});

export {getPaletteType, savePaletteType, paletteType, ThemeContext};
