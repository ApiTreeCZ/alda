import {Avatar, FormHelperText, List, ListItem, ListItemText, Paper, Typography, withStyles} from '@material-ui/core';
import {Check as CheckIcon} from '@material-ui/icons';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';

import {Lang} from '../../../Lang';

interface Props {}

const decorate = withStyles((theme) => ({
    root: {
        padding: theme.spacing.unit,
    },
    checkItemIcon: {
        backgroundColor: theme.palette.primary.main,
    },
}));

const questions = [Lang.ABOUT_QUESTIONS_STARTWITHREACT, Lang.ABOUT_QUESTIONS_STARTWITHMD, Lang.ABOUT_QUESTIONS_STARTWITHREDUX];

export const AboutPaper = decorate<Props>(({classes}) => {
    return (
        <Paper className={classes.root}>
            <FormattedMessage id={Lang.ABOUT_DESCRIPTION}>{(msg) => <Typography variant="subheading">{msg}</Typography>}</FormattedMessage>
            <List dense>
                {questions.map((row) => (
                    <FormattedMessage id={row} key={row}>
                        {(msg) => (
                            <ListItem>
                                <Avatar className={classes.checkItemIcon}>
                                    <CheckIcon />
                                </Avatar>
                                <ListItemText primary={msg} />
                            </ListItem>
                        )}
                    </FormattedMessage>
                ))}
                <FormattedMessage id={Lang.ABOUT_WITHTYPESCRIPT}>{(msg) => <FormHelperText>{msg}</FormHelperText>}</FormattedMessage>
            </List>
        </Paper>
    );
});
