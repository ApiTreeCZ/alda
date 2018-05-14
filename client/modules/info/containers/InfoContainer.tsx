import * as React from 'react';
import {Fragment} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Button, Grid, Slide, Typography} from '@material-ui/core';
import {OpenInBrowser as OpenInBrowserIcon, Refresh as RefreshIcon} from '@material-ui/icons';
import {Store} from '../../../Store';
import {InfoStore} from '../store';
import {InfoAction, InfoActionCreator} from '../actions';
import {DependenciesPaper, InfoHeaderPaper, InfoJsonDialog} from '../components';

interface OwnProps {}

interface ConnectedState {
    readonly info: InfoStore;
}

interface ConnectedDispatch extends InfoAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps;

const transition = (props) => <Slide direction="left" {...props} />;

export class Container extends React.Component<Props> {
    componentDidMount(): void {
        this.props.fetchInfo();
    }

    handleOnClickRefresh = () => {
        this.props.fetchInfo();
    };

    handleOnOpenDialogJson = () => {
        this.props.openDialogJson();
    };

    handleOnCloseDialogJson = () => {
        this.props.closeDialogJson();
    };

    render() {
        const {info} = this.props;
        return (
            <Fragment>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                <Typography variant="display1">Info</Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={this.handleOnClickRefresh}>
                                    <RefreshIcon />&nbsp;&nbsp;Refresh
                                </Button>
                                <Button onClick={this.handleOnOpenDialogJson} disabled={!info.data || info.isFetching}>
                                    <OpenInBrowserIcon />&nbsp;&nbsp;Show in JSON
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {info.data && (
                        <Fragment>
                            <Grid item xs={12}>
                                <InfoHeaderPaper data={info.data} />
                            </Grid>
                            <Grid item xs={12}>
                                <DependenciesPaper dependencies={info.data.DEPENDENCIES} />
                            </Grid>
                        </Fragment>
                    )}
                </Grid>
                <InfoJsonDialog open={info.isOpenDialogJson} data={info.data} onClose={this.handleOnCloseDialogJson} transition={transition} />
            </Fragment>
        );
    }
}

export const InfoContainer = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({info}: Store) => ({info}),
    (dispatch: Dispatch): ConnectedDispatch => InfoActionCreator(dispatch),
)(Container);
