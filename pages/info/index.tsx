import * as React from 'react';
import {app, AppProps} from '../../client/app';
import {InfoContainer} from '../../client/modules/info';

export default app()((props: AppProps) => <InfoContainer {...props} />);
