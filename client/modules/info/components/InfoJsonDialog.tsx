import * as React from 'react';
import {Fragment} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles} from '@material-ui/core';
import {InfoModel} from '../model';

interface Props {
    readonly open: boolean;
    readonly data: InfoModel;
    readonly onClose: () => void;
    readonly transition?: (props) => JSX.Element;
}

const decorate = withStyles((theme) => ({
    content: {
        color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    },
}));

export const InfoJsonDialog = decorate<Props>(({open, data, onClose, transition, classes}) => {
    return (
        <Dialog open={open} onClose={onClose} TransitionComponent={transition}>
            <DialogTitle>{'Info in JSON'}</DialogTitle>
            <DialogContent>
                <Fragment>
                    <DialogContentText>Info about system. Also you can get in url: /_info</DialogContentText>
                    {open && data && <pre className={classes.content}>{JSON.stringify(data, null, 2)}</pre>}
                </Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
});
