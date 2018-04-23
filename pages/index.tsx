import * as React from 'react';
import {Dispatch} from 'redux';
import {Button, Grid, Paper, Typography} from 'material-ui';
import {app} from '../client/app';
import {Store} from '../client/Store';
import {PageContainer} from '../client/containers';
import {ThemeAction, ThemeActionCreator} from '../client/actions';
import {ThemeStore} from '../client/stores';

interface OwnProps {}

interface ConnectedState {
    readonly theme: ThemeStore;
}

interface ConnectedDispatch extends ThemeAction {}

class Index extends React.Component<ConnectedState & ConnectedDispatch & OwnProps> {
    handleOnChangeTheme = () => {
        const {
            theme: {themeOptions},
            changeThemeOptions,
        } = this.props;
        changeThemeOptions({...themeOptions, palette: {...themeOptions.palette, type: themeOptions.palette.type === 'dark' ? 'light' : 'dark'}});
    };

    render() {
        const {
            theme: {themeOptions},
        } = this.props;
        return (
            <PageContainer>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="display1">ALDO</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            A boilerplate for React isomorphic aplication with Material Design, GraphQL, Redux, Redux Form and custom server
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            * Do you want to start with React? * Do you want to start with Material Design? * Do you want to start with Redux? * ...with
                            Typescript
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.handleOnChangeTheme}>Change theme from {themeOptions.palette.type}</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={{padding: 8}}>
                            <Typography variant="title">Default theme options:</Typography>
                            <Typography component="pre">{JSON.stringify(themeOptions, null, 2)}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </PageContainer>
        );
    }
}

export default app(({theme}: Store): ConnectedState => ({theme}), (dispatch: Dispatch): ConnectedDispatch => ThemeActionCreator(dispatch))(Index);
