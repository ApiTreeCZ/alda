import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {ThemeReducer} from './reducers';

export const rootReducer = combineReducers({
    form: formReducer,
    theme: ThemeReducer,
});
