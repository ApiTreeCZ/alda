import * as React from 'react';
import {AppBar, IconButton, PaletteType, Toolbar, Typography, withStyles} from 'material-ui';
import {LightbulbOutline, Menu as MenuIcon} from '@material-ui/icons';
import {FormattedMessage} from 'react-intl';
import {LightbublFullIcon} from './LightbublFullIcon';
import Link from 'next/link';
import {Lang} from '../Lang';

interface Props {
    readonly locale: string;
    readonly gitHubUrl: string;
    readonly paletteType: PaletteType;
    readonly onChangeTheme: () => void;
    readonly onClickOpenLeftMenu: () => void;
}

const decorate = withStyles((theme) => ({
    flex: {
        flex: 1,
    },
    title: {
        cursor: 'pointer',
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

export const TopBar = decorate<Props>(({gitHubUrl, classes, locale, paletteType, onChangeTheme, onClickOpenLeftMenu}) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onClickOpenLeftMenu}>
                <MenuIcon />
            </IconButton>
            <Link href={'/'}>
                <FormattedMessage id={Lang.TITLE}>
                    {(msg) => (
                        <Typography variant="title" color="inherit" className={classes.title}>
                            {msg}
                        </Typography>
                    )}
                </FormattedMessage>
            </Link>
            <div className={classes.flex} />
            <Typography>{locale}</Typography>
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
