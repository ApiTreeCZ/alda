import React from 'react';
import {Paper, Typography, withStyles} from 'material-ui';

interface Props {
    readonly imgSrc: string;
    readonly title: string;
    readonly description: string;
}

const decorate = withStyles((theme) => ({
    root: {},
    media: {
        height: 300,
        width: '100%',
        'object-fit': 'contain',
    },
    content: {
        padding: theme.spacing.unit,
    },
}));

export const TechCard = decorate<Props>(({classes, imgSrc, title, description}) => (
    <Paper className={classes.root}>
        <img src={imgSrc} title={title} className={classes.media} />
        <div className={classes.content}>
            <Typography gutterBottom variant="headline" component="h2">
                {title}
            </Typography>
            <Typography component="p">{description}</Typography>
        </div>
    </Paper>
));
