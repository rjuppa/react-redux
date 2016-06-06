import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function user(state=initialState.user, action={}) {
    console.log('--------------');   //no-console
    console.log(action);
    switch (action.type) {

        case types.REQUEST_LOGIN_SUCCESS:
            const userData = Object.assign({}, action.user);
            delete userData.lines;
            delete userData.positions;
            return userData;

        case types.REQUEST_LOGOUT_SUCCESS:
            return Object.assign({}, action.user);

        case types.SET_LANGUAGE:
            return Object.assign({}, state,
                {
                    lang: action.lang
                });

        default:
            return state;
    }
}