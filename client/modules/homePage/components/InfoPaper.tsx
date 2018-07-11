import {Paper, Typography, withStyles} from '@material-ui/core';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Lang} from '../../../Lang';

interface Props {}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },

    description: {
        paddingTop: theme.spacing.unit,
    },

    iconLinkWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.unit,
    },

    iconLink: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        paddingRight: theme.spacing.unit,
    },
}));

export const InfoPaper = decorate<Props>(({classes}) => {
    return (
        <Paper className={classes.root}>
            <FormattedMessage id={Lang.INFO_TITLE}>{(msg) => <Typography variant="subheading">{msg}</Typography>}</FormattedMessage>
            <FormattedMessage id={Lang.INFO_DESCRIPTION}>
                {(msg) => (
                    <Typography variant="caption" className={classes.description}>
                        {msg}
                    </Typography>
                )}
            </FormattedMessage>

            <div className={classes.iconLinkWrapper}>
                <a href={'https://apitree.cz'} target="_blank" className={classes.iconLink}>
                    <img src="/static/images/logo.svg" height={40} />
                </a>
                <div>
                    <a href={'https://github.com/ApiTreeCZ/alda'} target="_blank" className={classes.iconLink}>
                        <i className={`fab fa-github-square fa-2x`} />
                    </a>
                    <a href={'https://alesdostal.blogspot.com'} target="_blank" className={classes.iconLink}>
                        <i className={`fab fa-blogger fa-2x`} />
                    </a>
                    <a href={'https://www.facebook.com/ApiTree.cz'} target="_blank" className={classes.iconLink}>
                        <i className={`fab fa-facebook-square fa-2x`} />
                    </a>
                </div>
            </div>
        </Paper>
    );
});
