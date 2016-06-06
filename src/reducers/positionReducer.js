import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function positions(state=initialState.positions, action={}) {

    switch (action.type) {

        case types.REQUEST_LOGIN_SUCCESS:
            // load positions for terminal/user during login
            const positions_login = Object.assign([], action.user.positions);
            return positions_login;

        case types.LOAD_POSITIONS_SUCCESS:
            // load positions for terminal/user
            const positions = Object.assign([], action.positions);
            return positions;

        default:
            return state;
    }
}
