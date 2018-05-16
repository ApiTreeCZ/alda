import * as React from 'react';
import {Grid} from '@material-ui/core';
import {TestComponent} from '../components/TestComponent';

interface Props {}

class Container extends React.Component<Props> {
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <TestComponent />
                </Grid>
            </Grid>
        );
    }
}

export const BankApiContainer = Container;
