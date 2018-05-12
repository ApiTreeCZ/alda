import * as React from 'react';
import {app, AppProps} from '../client/app';
import {HomePageContainer} from '../client/modules/homePage';

export default app()((props: AppProps) => <HomePageContainer {...props} />);
