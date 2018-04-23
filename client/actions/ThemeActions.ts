import {bindActionCreators, Dispatch} from 'redux';
import {ThemeOptions} from 'material-ui/es/styles/createMuiTheme';
import {Action} from 'redux-actions';

const PREFIX = 'THEME_';

const ThemeActionType = {
    CHANGE_THEME_OPTIONS: `${PREFIX}CHANGE_THEME_OPTIONS`,
};

interface ThemeAction {
    readonly changeThemeOptions: (options: ThemeOptions) => Action<ThemeOptions>;
}

const ThemeActionDispatch: ThemeAction = {
    changeThemeOptions: (options: ThemeOptions) => ({type: ThemeActionType.CHANGE_THEME_OPTIONS, payload: options}),
};

const ThemeActionCreator = (dispatch: Dispatch) => bindActionCreators({...ThemeActionDispatch}, dispatch);

export {ThemeActionType, ThemeAction, ThemeActionCreator};
