import {Action, handleActions} from 'redux-actions';
import {ThemeActionType as ActionType} from '../actions';
import {ThemeStore as Store} from '../stores';
import {ThemeOptions} from 'material-ui/styles/createMuiTheme';

const initialState = {
    themeOptions: {
        palette: {
            type: 'dark',
        },
    },
} as Store;

export const ThemeReducer = handleActions<Store, any>(
    {
        [ActionType.CHANGE_THEME_OPTIONS]: (state: Store, {payload}: Action<ThemeOptions>): Store => ({...state, themeOptions: payload}),
    },
    initialState,
);
