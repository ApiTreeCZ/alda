/* tslint:disable */
import {GraphQLResolveInfo} from 'graphql';

type Resolver<Result, Args = any> = (parent: any, args: Args, context: any, info: GraphQLResolveInfo) => Promise<Result> | Result;

export interface Query {
    me?: Account | null;
}

export interface Account {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Mutation {
    updateMe?: Account | null;
}

export interface MeUpdateInput {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
}
export interface UpdateMeMutationArgs {
    input?: MeUpdateInput | null;
}

export namespace QueryResolvers {
    export interface Resolvers {
        me?: MeResolver;
    }

    export type MeResolver = Resolver<Account | null>;
}
export namespace AccountResolvers {
    export interface Resolvers {
        id?: IdResolver;
        firstName?: FirstNameResolver;
        lastName?: LastNameResolver;
    }

    export type IdResolver = Resolver<string>;
    export type FirstNameResolver = Resolver<string>;
    export type LastNameResolver = Resolver<string>;
}
export namespace MutationResolvers {
    export interface Resolvers {
        updateMe?: UpdateMeResolver;
    }

    export type UpdateMeResolver = Resolver<Account | null, UpdateMeArgs>;
    export interface UpdateMeArgs {
        input?: MeUpdateInput | null;
    }
}
