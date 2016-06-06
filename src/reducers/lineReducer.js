import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function lines(state=initialState.lines, action={}) {
    switch (action.type) {

        case types.REQUEST_LOGIN_SUCCESS:
            // load lines for terminal/user
            const lines = Object.assign([], action.user.lines);
            return lines;

        default:
            return state;
    }
}