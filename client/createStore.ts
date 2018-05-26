import {applyMiddleware, compose, createStore as reduxCreateStore, StoreCreator} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {rootReducer} from './rootReducer';

declare const window: any;

const isReduxDevTools = (isServer: boolean) => !isServer && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development';

const reduxTools = (store: StoreCreator, isServer: boolean) => (isReduxDevTools(isServer) ? window.__REDUX_DEVTOOLS_EXTENSION__()(store) : store);

export const createStore = (initialState: any, {isServer}: {isServer: boolean}) =>
    compose(applyMiddleware(thunkMiddleware))(reduxTools(reduxCreateStore, isServer))(rootReducer, initialState);
