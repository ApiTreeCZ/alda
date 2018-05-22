/* tslint:disable */

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
