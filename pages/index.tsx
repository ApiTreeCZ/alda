import * as React from 'react';
import {Dispatch} from 'redux';
import {Typography} from 'material-ui';
import {app} from '../client/app';
import {Store} from '../client/Store';

interface OwnProps {}

interface ConnectedState {}

interface ConnectedDispatch {}

class Index extends React.Component<ConnectedState & ConnectedDispatch & OwnProps> {
    render() {
        return (
            <div>
                <Typography variant="display1">ALDO</Typography>
            </div>
        );
    }
}

export default app(({}: Store): ConnectedState => ({}), (_: Dispatch<Store>): ConnectedDispatch => ({}))(Index);
