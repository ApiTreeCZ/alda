import {InfoStore} from './modules/info';
import {FormStateMap} from 'redux-form';

export interface Store {
    readonly info: InfoStore;
    readonly form: FormStateMap;
}
