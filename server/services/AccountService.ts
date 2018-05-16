import {Account, UpdateMeMutationArgs} from '@graphql-model';

let fakeAccount: Account = {
    id: '1',
    firstName: 'Ales',
    lastName: 'Dostal',
};

export const AccountService = {
    findLoggedUser(): Account {
        return fakeAccount;
    },

    save({input}: UpdateMeMutationArgs): Account {
        fakeAccount = {...fakeAccount, firstName: input.firstName || input.firstName, lastName: input.lastName || input.lastName};
        return fakeAccount;
    },
};
