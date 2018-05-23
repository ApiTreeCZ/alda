import gql from 'graphql-tag';

/**
 * All account queries
 */
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
};
