import {applyMiddleware, compose, createStore as reduxCreateStore, StoreCreator} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Store} from './Store';
import {rootReducer} from './rootReducer';

declare const window: any;

const isEnableReduxDevTools = (isServer: boolean) => {
    return !isServer && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development';
};

const reduxTools = (store: StoreCreator, isServer: boolean) => {
    return isEnableReduxDevTools(isServer) ? window.__REDUX_DEVTOOLS_EXTENSION__()(store) : store;
};

export const createStore: any = (initialState: Store, {isServer}: any) => {
    return compose(applyMiddleware(thunkMiddleware))(reduxTools(reduxCreateStore, isServer))(rootReducer, initialState);
};
