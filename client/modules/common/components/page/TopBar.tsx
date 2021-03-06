import {AppBar, IconButton, Theme, Toolbar, Typography, withStyles} from '@material-ui/core';
import {Highlight as HighlightIcon, Menu as MenuIcon} from '@material-ui/icons';
import Link from 'next/link';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';

import {ThemeContext} from '../../../../contexts';
import {Lang} from '../../../../Lang';
import {LightbublFullIcon} from '../icon';

interface Props {
    readonly locale: string;
    readonly gitHubUrl: string;
    readonly onClickOpenLeftMenu: () => void;
}

const decorate = withStyles((theme: Theme) => ({
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

export const TopBar = decorate<Props>(({gitHubUrl, classes, locale, onClickOpenLeftMenu}) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onClickOpenLeftMenu}>
                <MenuIcon />
            </IconButton>
            <FormattedMessage id={Lang.TITLE}>
                {(msg) => (
                    <Link href={'/'}>
                        <Typography variant="title" color="inherit" className={classes.title}>
                            {msg}
                        </Typography>
                    </Link>
                )}
            </FormattedMessage>
            <div className={classes.flex} />
            <Typography color="inherit">{locale && locale.toUpperCase()}</Typography>
            <ThemeContext.Consumer>
                {({paletteType, toggleTheme}) => (
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {paletteType === 'light' ? <HighlightIcon /> : <LightbublFullIcon />}
                    </IconButton>
                )}
            </ThemeContext.Consumer>
            <a href={gitHubUrl} target="_blank" className={classes.externalLink}>
                <IconButton>
                    <i className={`fab fa-github ${classes.iconColor}`} />
                </IconButton>
            </a>
        </Toolbar>
    </AppBar>
));
