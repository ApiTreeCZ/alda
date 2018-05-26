import {bindActionCreators, Dispatch} from 'redux';
import {Action} from 'redux-actions';

const PREFIX = 'THEME_';

export const PageActionType = {
    OPEN_LEFT_MENU: `${PREFIX}OPEN_LEFT_MENU`,
    CLOSE_LEFT_MENU: `${PREFIX}CLOSE_LEFT_MENU`,
};

export interface PageAction {
    readonly openLeftMenu: () => Action<void>;
    readonly closeLeftMenu: () => Action<void>;
}

const PageActionDispatch: PageAction = {
    openLeftMenu: () => ({type: PageActionType.OPEN_LEFT_MENU}),
    closeLeftMenu: () => ({type: PageActionType.CLOSE_LEFT_MENU}),
};

export const PageActionCreator = (dispatch: Dispatch) => bindActionCreators({...PageActionDispatch}, dispatch);
