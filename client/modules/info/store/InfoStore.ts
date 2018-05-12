import {InfoModel} from '../model';

export interface InfoStore {
    readonly isFetching: boolean;
    readonly isFetched: boolean;
    readonly data?: InfoModel;
    readonly isOpenDialogJson: boolean;
}
