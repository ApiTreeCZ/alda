import * as React from 'react';
import {Fragment} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles} from 'material-ui';
import {InfoModel} from '../model';

interface Props {
    readonly open: boolean;
    readonly data: InfoModel;
    readonly onClose: () => void;
}

const decorate = withStyles((theme) => ({
    content: {
        color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    },
}));

export const InfoJsonDialog = decorate<Props>(({open, data, onClose, classes}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            {open &&
                data && (
                    <Fragment>
                        <DialogTitle>{'Info in JSON'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Info about system. Also you can get in url: /_info</DialogContentText>
                            <pre className={classes.content}>{JSON.stringify(data, null, 2)}</pre>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Close</Button>
                        </DialogActions>
                    </Fragment>
                )}
        </Dialog>
    );
});
