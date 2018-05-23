import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import {Action, handleActions} from 'redux-actions';
import {PageActionType as ActionType} from '../actions';
import {PageStore as Store} from '../stores';

const initialState = {
    themeOptions: {
        palette: {
            type: 'dark',
        },
    },
    isOpenLeftMenu: false,
} as Store;

export const PageReducer = handleActions<Store, any>(
    {
        [ActionType.CHANGE_THEME_OPTIONS]: (state: Store, {payload}: Action<ThemeOptions>): Store => ({...state, themeOptions: payload || state.themeOptions}),

        [ActionType.OPEN_LEFT_MENU]: (state: Store): Store => ({...state, isOpenLeftMenu: true}),
        [ActionType.CLOSE_LEFT_MENU]: (state: Store): Store => ({...state, isOpenLeftMenu: false}),
    },
    initialState,
);
