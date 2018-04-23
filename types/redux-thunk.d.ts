// FIXME https://stackoverflow.com/questions/49907244/redux-thunk-with-typescript
// FIXME https://github.com/gaearon/redux-thunk/issues/169
import { Middleware, Dispatch, Action, AnyAction } from 'redux';

export type ThunkAction<R, S, A = AnyAction, E = {}> = (dispatch: Dispatch<A, S>, getState: () => S, extraArgument: E) => R;

declare module 'redux' {
    export interface Dispatch<A extends Action = AnyAction, S = {}> {
        <R, E>(thunk: ThunkAction<R, S, A, E>): R
    }
}

declare const thunk: Middleware & {
    withExtraArgument(extraArgument: any): Middleware;
};

export default thunk;
