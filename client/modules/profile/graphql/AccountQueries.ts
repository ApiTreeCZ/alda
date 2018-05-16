import gql from 'graphql-tag';

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
