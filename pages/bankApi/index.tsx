import * as React from 'react';
import {app} from '../../client/app';
import {BankApiContainer} from '../../client/modules/bankApi';

export default app(() => <BankApiContainer />);
