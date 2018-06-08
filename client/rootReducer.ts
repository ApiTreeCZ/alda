import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {InfoReducer} from './modules/info';

export const rootReducer = combineReducers<any>({
    form: formReducer,
    info: InfoReducer,
});
