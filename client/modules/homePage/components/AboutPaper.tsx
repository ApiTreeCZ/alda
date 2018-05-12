import * as React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Paper, Typography, withStyles} from 'material-ui';
import {FormattedMessage} from 'react-intl';
import {Lang} from '../../../Lang';

interface Props {}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },
}));

// FIXME - rewrite by react-intl
const questions = ['Do you want to start with React?', 'Do you want to start with Material Design?', 'Do you want to start with Redux?'];

export const AboutPaper = decorate<Props>(({classes}) => {
    return (
        <Paper className={classes.root}>
            <FormattedMessage id={Lang.DESCRIPTION}>{(msg) => <Typography variant="subheading">{msg}</Typography>}</FormattedMessage>
            <FormControl component="fieldset">
                <FormGroup>{questions.map((row) => <FormControlLabel key={row} control={<Checkbox checked />} label={`* ${row}`} />)}</FormGroup>
                <FormHelperText>...with Typescript</FormHelperText>
            </FormControl>
        </Paper>
    );
});
