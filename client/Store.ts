import {PageStore} from './stores';
import {InfoStore} from './modules/info';

export interface Store {
    readonly page: PageStore;
    readonly info: InfoStore;
}
