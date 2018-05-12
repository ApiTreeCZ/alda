import * as React from 'react';
import {AppBar, IconButton, PaletteType, Toolbar, Typography, withStyles} from 'material-ui';
import {LightbulbOutline, Menu as MenuIcon} from '@material-ui/icons';
import {LightbublFullIcon} from './LightbublFullIcon';

interface Props {
    readonly title: string;
    readonly gitHubUrl: string;
    readonly paletteType: PaletteType;
    readonly onChangeTheme: () => void;
}

const decorate = withStyles((theme) => ({
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    externalLink: {
        textDecoration: 'none',
    },

    iconColor: {
        color: theme.palette.primary.contrastText,
    },
}));

export const TopBar = decorate<Props>(({title, gitHubUrl, classes, paletteType, onChangeTheme}) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
                {title}
            </Typography>
            <IconButton color="inherit" onClick={onChangeTheme}>
                {paletteType === 'light' ? <LightbulbOutline /> : <LightbublFullIcon />}
            </IconButton>
            <a href={gitHubUrl} target="_blank" className={classes.externalLink}>
                <IconButton>
                    <i className={`fab fa-github ${classes.iconColor}`} />
                </IconButton>
            </a>
        </Toolbar>
    </AppBar>
));
