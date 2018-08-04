import {bindActionCreators, Dispatch} from 'redux';

const PREFIX = 'INFO_';

export const InfoActionType = {
    FETCHING_INFO: `${PREFIX}FETCHING_INFO`,
    FETCHED_INFO: `${PREFIX}FETCHED_INFO`,
};

const InfoActionDispatch = {
    fetchInfo: () => (dispatch) => {
        dispatch({type: InfoActionType.FETCHING_INFO});
        fetch('/_info')
            .then((res) => res.json())
            .then((res) => {
                dispatch({type: InfoActionType.FETCHED_INFO, payload: res});
            });
    },
};

export type InfoAction = typeof InfoActionDispatch;

export const InfoActionCreator = (dispatch: Dispatch) => bindActionCreators({...InfoActionDispatch}, dispatch);
