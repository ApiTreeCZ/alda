import * as React from 'react';
import {Grid, List, ListItem, ListItemText, Paper, Typography, withStyles} from 'material-ui';
import {InfoModel} from '../model';

interface Props {
    readonly data: InfoModel;
}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },
}));

export const InfoHeaderPaper = decorate<Props>(({data, classes}) => {
    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="title">Main info</Typography>
                </Grid>
                {Object.keys(data)
                    .filter((f) => typeof data[f] === 'string')
                    .map((row) => (
                        <Grid item xs={12} md={6} lg={3} key={row}>
                            <List dense>
                                <ListItem>
                                    <ListItemText primary={row} secondary={data[row]} />
                                </ListItem>
                            </List>
                        </Grid>
                    ))}
            </Grid>
        </Paper>
    );
});
