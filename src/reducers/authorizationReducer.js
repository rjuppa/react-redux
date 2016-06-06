import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function authorization(state=initialState.authorization, action={}) {

    switch (action.type) {

        case types.AUTHORIZATION_REQUIRED:
            return {authorizationRequired: true, chipcard_num: '', status: 'WAITING', option: action.option};

        case types.AUTHORIZATION_CANCELED:
            return {authorizationRequired: false, chipcard_num: '', status: '', option: {}};

        case types.AUTHORIZATION_FILLED:
            return Object.assign({}, state, {action: action.authorization}, {status: 'VERIFYING'});

        case types.AUTHORIZATION_SUCCESS:
            return Object.assign({}, state, {authorizationRequired: false, status: 'SUCCESS'});

        case types.AUTHORIZATION_FAILED:
            return Object.assign({}, state, {authorizationRequired: false, status: 'FAILED'});

        default:
            return state;
    }
}
