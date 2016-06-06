import * as types from '../actions/actionTypes';
import initialState from './initialState';


    //app: {
    //    countdown: false,
    //    action: 'ACTION_LOGIN',
    //    onsuccess_message: '',
    //    onfailed_message: ''
    //},

export default function app(state=initialState.app, action={}) {
    switch (action.type) {

        case types.PRE_SELECT_ACTION:
            return Object.assign({}, state, {action: action.action});

        case types.REQUEST_ACTION_SUCCESS:
            return Object.assign({}, state,
                {
                    onsuccess_message: action.message,
                    onfailed_message: '',
                    countdown: true
                });

        case types.REQUEST_ACTION_FAILED:
            return Object.assign({}, state,
                {
                    onsuccess_message: '',
                    onfailed_message: action.message,
                    countdown: true
                });

        case types.AUTHORIZATION_SUCCESS:
            return Object.assign({}, state,
                {
                    onsuccess_message: 'Access for: ' + action.authorization.action_type + ' was approved.',
                    onfailed_message: '',
                    countdown: true
                });

        case types.AUTHORIZATION_FAILED:
            return Object.assign({}, state,
                {
                    onsuccess_message: '',
                    onfailed_message: 'Access for: ' + action.authorization.action_type + ' was denied.',
                    countdown: true
                });

        default:
            return state;
    }
}
