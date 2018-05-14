import {applyMiddleware, compose, createStore as reduxCreateStore, StoreCreator} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Store} from './Store';
import {rootReducer} from './rootReducer';
import {getThemeOptions, saveThemeOptions} from './with';

declare const window: any;

const isReduxDevTools = (isServer: boolean) => !isServer && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development';

const reduxTools = (store: StoreCreator, isServer: boolean) => (isReduxDevTools(isServer) ? window.__REDUX_DEVTOOLS_EXTENSION__()(store) : store);

const getInitialState = (state: Store, isServer: boolean) => {
    try {
        return isServer ? state : {...state, page: {...state.page, themeOptions: {...state.page.themeOptions, ...getThemeOptions()}}};
    } catch (err) {
        return state;
    }
};

export const createStore = (initialState: Store, {isServer}: {isServer: boolean}) => {
    const store = compose(applyMiddleware(thunkMiddleware))(reduxTools(reduxCreateStore, isServer))(rootReducer, getInitialState(initialState, isServer));
    store.subscribe(() => {
        saveThemeOptions(store.getState().page.themeOptions);
    });
    return store;
};
