import {applyMiddleware, compose, createStore as reduxCreateStore, StoreCreator} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {rootReducer} from './rootReducer';
import {Store} from './Store';
import {getThemeOptions} from './with';

declare const window: any;

const isReduxDevTools = (isServer: boolean) => !isServer && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development';

const reduxTools = (store: StoreCreator, isServer: boolean) => (isReduxDevTools(isServer) ? window.__REDUX_DEVTOOLS_EXTENSION__()(store) : store);

const getInitialState = (state: Store, isServer: boolean): any => {
    try {
        return isServer ? state : {...state, page: {...state.page, themeOptions: {...state.page.themeOptions, ...getThemeOptions()}}};
    } catch (err) {
        return state;
    }
};

export const createStore = (initialState: Store, {isServer}: {isServer: boolean}) =>
    compose(applyMiddleware(thunkMiddleware))(reduxTools(reduxCreateStore, isServer))(rootReducer, getInitialState(initialState, isServer));
