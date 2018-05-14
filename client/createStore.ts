import {applyMiddleware, compose, createStore as reduxCreateStore, StoreCreator} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {ThemeOptions} from 'material-ui/styles/createMuiTheme';
import {Store} from './Store';
import {rootReducer} from './rootReducer';

declare const window: any;

const isReduxDevTools = (isServer: boolean) => !isServer && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development';

const reduxTools = (store: StoreCreator, isServer: boolean) => (isReduxDevTools(isServer) ? window.__REDUX_DEVTOOLS_EXTENSION__()(store) : store);

const getInitialState = (initialState: Store, isServer: boolean) => {
    try {
        return isServer
            ? initialState
            : {...initialState, page: {...initialState.page, themeOptions: {...initialState.page.themeOptions, ...getThemeOptions()}}};
    } catch (err) {
        return initialState;
    }
};

const getThemeOptions = (): ThemeOptions | undefined => {
    try {
        const find = localStorage.getItem('themeOptions');
        if (find === null) {
            return undefined;
        }
        return JSON.parse(find);
    } catch (err) {
        return undefined;
    }
};

const saveThemeOptions = (theme: ThemeOptions) => {
    try {
        localStorage.setItem('themeOptions', JSON.stringify(theme));
    } catch (err) {
        // nothing...
    }
};

export const createStore = (initialState: Store, {isServer}: {isServer: boolean}) => {
    const store = compose(applyMiddleware(thunkMiddleware))(reduxTools(reduxCreateStore, isServer))(rootReducer, getInitialState(initialState, isServer));
    store.subscribe(() => {
        saveThemeOptions(store.getState().page.themeOptions);
    });
    return store;
};
