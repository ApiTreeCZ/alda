import * as React from 'react';
import {Grid} from '@material-ui/core';
import {UserDetail} from '../components';

interface Props {}

class Container extends React.Component<Props> {
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <UserDetail />
                </Grid>
            </Grid>
        );
    }
}

export const ProfileContainer = Container;
