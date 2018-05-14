import {bindActionCreators, Dispatch} from 'redux';
import {ThemeOptions} from 'material-ui/es/styles/createMuiTheme';
import {Action} from 'redux-actions';

const PREFIX = 'THEME_';

export const PageActionType = {
    CHANGE_THEME_OPTIONS: `${PREFIX}CHANGE_THEME_OPTIONS`,
    OPEN_LEFT_MENU: `${PREFIX}OPEN_LEFT_MENU`,
    CLOSE_LEFT_MENU: `${PREFIX}CLOSE_LEFT_MENU`,
};

export interface PageAction {
    readonly changeThemeOptions: (options: ThemeOptions) => Action<ThemeOptions>;
    readonly openLeftMenu: () => Action<void>;
    readonly closeLeftMenu: () => Action<void>;
}

const PageActionDispatch: PageAction = {
    changeThemeOptions: (options: ThemeOptions) => ({type: PageActionType.CHANGE_THEME_OPTIONS, payload: options}),

    openLeftMenu: () => ({type: PageActionType.OPEN_LEFT_MENU}),
    closeLeftMenu: () => ({type: PageActionType.CLOSE_LEFT_MENU}),
};

export const PageActionCreator = (dispatch: Dispatch) => bindActionCreators({...PageActionDispatch}, dispatch);
