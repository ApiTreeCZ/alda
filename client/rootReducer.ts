import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {PageReducer} from './reducers';
import {InfoReducer} from './modules/info';

export const rootReducer = combineReducers({
    form: formReducer,
    page: PageReducer,
    info: InfoReducer,
});
