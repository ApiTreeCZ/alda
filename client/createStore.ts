import {applyMiddleware, compose, createStore as reduxCreateStore, StoreCreator} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Store} from './Store';
import {rootReducer} from './rootReducer';
import {ThemeOptions} from 'material-ui/styles/createMuiTheme';

declare const window: any;

const isEnableReduxDevTools = (isServer: boolean) => !isServer && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development';

const reduxTools = (store: StoreCreator, isServer: boolean) => (isEnableReduxDevTools(isServer) ? window.__REDUX_DEVTOOLS_EXTENSION__()(store) : store);

export const createStore = (initialState: Store, {isServer}: {isServer: boolean}) => {
    const state = isServer
        ? initialState
        : {...initialState, page: {...initialState.page, themeOptions: {...initialState.page.themeOptions, ...getThemeOptions()}}};
    const store = compose(applyMiddleware(thunkMiddleware))(reduxTools(reduxCreateStore, isServer))(rootReducer, state);
    store.subscribe(() => {
        saveThemeOptions(store.getState().page.themeOptions);
    });
    return store;
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
    localStorage.setItem('themeOptions', JSON.stringify(theme));
};
