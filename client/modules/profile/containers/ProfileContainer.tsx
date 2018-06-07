import {Grid} from '@material-ui/core';
import * as React from 'react';

import {PageContainer} from '../../../containers';
import {UserDetail} from '../components';

interface Props {}

class Container extends React.Component<Props> {
    render() {
        return (
            <PageContainer>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <UserDetail />
                    </Grid>
                </Grid>
            </PageContainer>
        );
    }
}

export const ProfileContainer = Container;
