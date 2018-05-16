import gql from 'graphql-tag';
import {Query as GraphQLQuery} from '@graphql-model';
import {Query} from 'react-apollo';

export const AccountQueries = {
    gql: {
        me: gql`
            query {
                me {
                    id
                    firstName
                    lastName
                }
            }
        `,
    },

    component: {
        me: class MeQuery extends Query<GraphQLQuery> {},
    },
};
