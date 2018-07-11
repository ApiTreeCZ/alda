import * as React from 'react';
import {withStyles} from '@material-ui/core';

interface Props {}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },
}));

export const Content = decorate<Props>(({children, classes}) => <div className={classes.root}>{children}</div>);
