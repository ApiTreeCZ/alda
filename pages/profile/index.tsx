import * as React from 'react';
import {Grid} from '@material-ui/core';
import {Layout} from '../../client/modules/common';
import {UserDetail} from '../../client/modules/profile';

export default () => (
    <Layout>
        <Grid container spacing={8}>
            <Grid item xs={12}>
                <UserDetail />
            </Grid>
        </Grid>
    </Layout>
);
