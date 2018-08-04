import {ApolloServer, Config, gql} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import {AccountService} from '../services';
import {UpdateMeMutationArgs} from '@graphql-model';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const resolvers = {
    Query: {
        me: (_: any) => AccountService.findLoggedUser(),
    },

    Mutation: {
        updateMe: (args: UpdateMeMutationArgs) => AccountService.save(args),
    },
};

export const createApolloServer = (config?: Omit<Config, 'resolvers' | 'typeDefs'>): ApolloServer => {
    return new ApolloServer({
        ...config,
        typeDefs: gql`
            ${importSchema('schema/root.graphql')}
        `,
        resolvers,
    });
};
