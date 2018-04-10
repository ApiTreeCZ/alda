import * as React from 'react';
import {Dispatch} from 'redux';
import {Grid, Typography} from 'material-ui';
import {app} from '../client/app';
import {Store} from '../client/Store';
import {PageContainer} from '../client/containers';

interface OwnProps {}

interface ConnectedState {}

interface ConnectedDispatch {}

class Index extends React.Component<ConnectedState & ConnectedDispatch & OwnProps> {
    render() {
        return (
            <PageContainer>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="display1">ALDO</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            A boilerplate for React isomorphic aplication with Material Design, GraphQL, Redux, Redux Form and custom server
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            * Do you want to start with React? * Do you want to start with Material Design? * Do you want to start with Redux? * ...with
                            Typescript
                        </Typography>
                    </Grid>
                </Grid>
            </PageContainer>
        );
    }
}

export default app(({}: Store): ConnectedState => ({}), (_: Dispatch<Store>): ConnectedDispatch => ({}))(Index);
