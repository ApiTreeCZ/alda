import * as React from 'react';
import {withStyles} from '@material-ui/core';

interface Props {}

const decorate = withStyles((theme) => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
            margin: 0,
        },
    } as any,
}));

export const AppFrame = decorate<Props>(({children}) => <div id="loadingContent">{children}</div>);
