import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools';
import {importSchema} from 'graphql-import';
import {AccountService} from '../services';
import {UpdateMeMutationArgs} from '@graphql-model';

const resolvers = {
    Query: {
        me: (_: any) => AccountService.findLoggedUser(),
    },

    Mutation: {
        updateMe: (args: UpdateMeMutationArgs) => AccountService.save(args),
    },
};

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: importSchema('schema/root.graphql'),
    resolvers,
});
