import {bindActionCreators, Dispatch} from 'redux';
import {Action} from 'redux-actions';

const PREFIX = 'INFO_';

const InfoActionType = {
    FETCHING_INFO: `${PREFIX}FETCHING_INFO`,
    FETCHED_INFO: `${PREFIX}FETCHED_INFO`,
    OPEN_DIALOG_JSON: `${PREFIX}OPEN_DIALOG_JSON`,
    CLOSE_DIALOG_JSON: `${PREFIX}CLOSE_DIALOG_JSON`,
};

interface InfoAction {
    readonly fetchInfo: () => (dispatch: Dispatch) => void;
    readonly openDialogJson: () => Action<void>;
    readonly closeDialogJson: () => Action<void>;
}

const InfoActionDispatch: InfoAction = {
    fetchInfo: () => (dispatch) => {
        dispatch({type: InfoActionType.FETCHING_INFO});
        fetch('/_info')
            .then((res) => res.json())
            .then((res) => {
                dispatch({type: InfoActionType.FETCHED_INFO, payload: res});
            });
    },

    openDialogJson: () => ({type: InfoActionType.OPEN_DIALOG_JSON}),
    closeDialogJson: () => ({type: InfoActionType.CLOSE_DIALOG_JSON}),
};

const InfoActionCreator = (dispatch: Dispatch) => bindActionCreators({...InfoActionDispatch}, dispatch);

export {InfoActionType, InfoAction, InfoActionCreator};
