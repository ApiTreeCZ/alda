import {createStore} from './createStore';
import {Store} from './Store';

describe('createStore.ts', () => {
    it('isEnableReduxDevTools', () => {
        const initialState: Store = {};
        const state = createStore(initialState, {isServer: true}).getState();
        expect({...initialState, form: {}}).toEqual(state);
    });
});
