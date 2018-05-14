import * as React from 'react';
import {Grid, List, ListItem, ListItemText, Paper, Typography, withStyles} from 'material-ui';

interface Props {
    readonly dependencies: {[key: string]: string};
}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },
}));

export const DependenciesPaper = decorate<Props>(({dependencies, classes}) => {
    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="title">Dependencies</Typography>
                </Grid>
                {Object.keys(dependencies).map((row) => (
                    <Grid item xs={12} md={6} lg={3} key={row}>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={row} secondary={dependencies[row]} />
                            </ListItem>
                        </List>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
});
