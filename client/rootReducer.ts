import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {InfoReducer} from './modules/info';
import {PageReducer} from './reducers';

export const rootReducer = combineReducers<any>({
    form: formReducer,
    page: PageReducer,
    info: InfoReducer,
});
