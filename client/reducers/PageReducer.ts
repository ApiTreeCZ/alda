import {handleActions} from 'redux-actions';

import {PageActionType as ActionType} from '../actions';
import {PageStore as Store} from '../stores';

const initialState = {
    isOpenLeftMenu: false,
} as Store;

export const PageReducer = handleActions<Store, any>(
    {
        [ActionType.OPEN_LEFT_MENU]: (state: Store): Store => ({...state, isOpenLeftMenu: true}),
        [ActionType.CLOSE_LEFT_MENU]: (state: Store): Store => ({...state, isOpenLeftMenu: false}),
    },
    initialState,
);
