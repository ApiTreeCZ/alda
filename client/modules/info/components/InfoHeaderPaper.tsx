import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from 'material-ui';
import {InfoModel} from '../model';

interface Props {
    readonly data: InfoModel;
}

const decorate = withStyles((_) => ({
    root: {},
}));

export const InfoHeaderPaper = decorate<Props>(({data, classes}) => {
    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell>DESCRIPTION</TableCell>
                        <TableCell>AUTHOR</TableCell>
                        <TableCell>VERSION</TableCell>
                        <TableCell>HOMEPAGE</TableCell>
                        <TableCell>LC_CTYPE</TableCell>
                    </TableRow>
                </TableHead>
                {data && (
                    <TableBody>
                        <TableRow>
                            <TableCell>{data.NAME}</TableCell>
                            <TableCell>{data.DESCRIPTION}</TableCell>
                            <TableCell>{data.AUTHOR}</TableCell>
                            <TableCell>{data.VERSION}</TableCell>
                            <TableCell>{data.HOMEPAGE}</TableCell>
                            <TableCell>{data.LC_CTYPE}</TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </Paper>
    );
});
