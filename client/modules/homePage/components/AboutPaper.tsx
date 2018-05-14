import * as React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Paper, Typography, withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {Lang} from '../../../Lang';

interface Props {}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },
}));

const questions = [Lang.ABOUT_QUESTIONS_STARTWITHREACT, Lang.ABOUT_QUESTIONS_STARTWITHMD, Lang.ABOUT_QUESTIONS_STARTWITHREDUX];

export const AboutPaper = decorate<Props>(({classes}) => {
    return (
        <Paper className={classes.root}>
            <FormattedMessage id={Lang.ABOUT_DESCRIPTION}>{(msg) => <Typography variant="subheading">{msg}</Typography>}</FormattedMessage>
            <FormControl component="fieldset">
                <FormGroup>
                    {questions.map((row) => (
                        <FormattedMessage id={row} key={row}>
                            {(msg) => <FormControlLabel control={<Checkbox checked />} label={msg} />}
                        </FormattedMessage>
                    ))}
                </FormGroup>
                <FormattedMessage id={Lang.ABOUT_WITHTYPESCRIPT}>{(msg) => <FormHelperText>{msg}</FormHelperText>}</FormattedMessage>
            </FormControl>
        </Paper>
    );
});
