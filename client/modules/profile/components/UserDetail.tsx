import {Query as GraphQLQuery} from '@graphql-model';
import {Button, Grid, LinearProgress, Typography, withStyles} from '@material-ui/core';
import {Refresh as RefreshIcon} from '@material-ui/icons';
import * as React from 'react';
import {Fragment} from 'react';
import {Query} from 'react-apollo';

import {AccountQueries} from '../graphql';

class MeQuery extends Query<GraphQLQuery> {}

interface Props {}

const decorate = withStyles((_) => ({}));

export const UserDetail = decorate<Props>(({}) => {
    return (
        <MeQuery query={AccountQueries.gql.me} notifyOnNetworkStatusChange>
            {({data, loading, refetch}) => {
                const handleOnClickRefresh = () => {
                    refetch();
                };

                return (
                    <Fragment>
                        <Grid container spacing={16}>
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="space-between">
                                    <Grid item>
                                        <Typography variant="display1">Profile</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleOnClickRefresh} disabled={loading}>
                                            <RefreshIcon />&nbsp;&nbsp;Refresh
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {loading && (
                                <Grid item xs={12}>
                                    <LinearProgress />
                                </Grid>
                            )}
                            {data &&
                                data.me && (
                                    <Grid item xs={12}>
                                        <Typography variant="title">Logged user</Typography>
                                        <Typography>
                                            {data.me.firstName} {data.me.lastName}
                                        </Typography>
                                    </Grid>
                                )}
                        </Grid>
                    </Fragment>
                );
            }}
        </MeQuery>
    );
});
