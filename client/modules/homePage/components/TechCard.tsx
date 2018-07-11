import React from 'react';
import {Paper, Typography, withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

interface Props {
    readonly imgSrc: string;
    readonly title: string;
    readonly description: string;
}

const decorate = withStyles((theme) => ({
    root: {
        marginTop: 20,
    },

    mediaWrapper: {
        float: 'left' as 'left',
        marginTop: -20,
        marginRight: 15,
        borderRadius: 4,
        padding: 8,
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 100 : 500],
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    },

    media: {
        height: 50,
        'object-fit': 'contain',
    },

    content: {
        padding: theme.spacing.unit,
        clear: 'left' as 'left',
    },
}));

export const TechCard = decorate<Props>(({classes, imgSrc, title, description}) => (
    <Paper className={classes.root}>
        <div className={classes.content}>
            <div className={classes.mediaWrapper}>
                <img src={imgSrc} title={title} className={classes.media} />
            </div>
            <Typography gutterBottom variant="body1" component="h2">
                {title}
            </Typography>
        </div>
        <div className={classes.content}>
            <FormattedMessage id={description}>{(msg) => <Typography variant="caption">{msg}</Typography>}</FormattedMessage>
        </div>
    </Paper>
));
