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
        if (!input) {
            return fakeAccount;
        }
        fakeAccount = {...fakeAccount, firstName: input.firstName || fakeAccount.firstName, lastName: input.lastName || fakeAccount.lastName};
        return fakeAccount;
    },
};
