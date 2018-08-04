import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {InfoReducer} from './modules/info';
import {Store} from './Store';

type Reducers = {[P in keyof Store]: any};

export const rootReducer = combineReducers<Reducers>({
    form: formReducer,
    info: InfoReducer,
});
