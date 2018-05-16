import * as React from 'react';
import {Fragment} from 'react';
import {Query} from 'react-apollo';
import {Query as GraphQLQuery} from '../../../graphql';
import {Button, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import gql from 'graphql-tag';

class AccountsQuery extends Query<GraphQLQuery> {}

interface Props {}

const decorate = withStyles((_) => ({}));

const query = gql`
    query {
        csas {
            accounts {
                accounts {
                    id
                    currency
                }
            }
        }
    }
`;

export const TestComponent = decorate<Props>(({}) => {
    return (
        <AccountsQuery query={query} notifyOnNetworkStatusChange>
            {({data, loading, refetch}) => {
                if (loading) {
                    return <LinearProgress />;
                }

                const handleOnClickRefresh = () => {
                    refetch();
                };

                return (
                    <Fragment>
                        <Button onClick={handleOnClickRefresh}>Refresh</Button>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Currency</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.csas &&
                                        data.csas.accounts.accounts.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.currency}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Fragment>
                );
            }}
        </AccountsQuery>
    );
});
