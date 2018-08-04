import {Action, handleActions} from 'redux-actions';
import {InfoActionType as ActionType} from '../actions';
import {InfoStore as Store} from '../store';
import {InfoModel} from '../model';

const initialState = {
    isFetching: false,
    isFetched: false,
    data: undefined,
} as Store;

export const InfoReducer = handleActions<Store, any>(
    {
        [ActionType.FETCHING_INFO]: (state: Store): Store => ({...state, isFetching: true}),
        [ActionType.FETCHED_INFO]: (state: Store, {payload}: Action<InfoModel>): Store => ({...state, isFetching: false, isFetched: true, data: payload}),
    },
    initialState,
);
