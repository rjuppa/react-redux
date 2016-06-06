import terminalService from '../services/TerminalService';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


// PRE_SELECT_ACTION
export function preSelectActionDone(action) {
    return {type: types.PRE_SELECT_ACTION, action: action};
}

export function preSelectAction(action) {
    return dispatch => {
        dispatch(preSelectActionDone(action));
    };
}


// Terminal actions
export function loadLinesSuccess(lines) {
    return {type: types.LOAD_LINES_SUCCESS, lines: lines};
}

export function loadPositionsSuccess(positions) {
    return {type: types.LOAD_POSITIONS_SUCCESS, positions: positions};
}

export function writeActionSuccess(message) {
    return {type: types.REQUEST_ACTION_SUCCESS, message: message};
}

export function writeActionFailed(message) {
    return {type: types.REQUEST_ACTION_FAILED, message: message};
}



export function askForAuthorization(option) {
    return {type: types.AUTHORIZATION_REQUIRED, option: option};
}

export function dismissAuthorization() {
    return {type: types.AUTHORIZATION_CANCELED};
}

export function authorizationFilled(authorization) {
    return {type: types.AUTHORIZATION_FILLED, authorization: authorization};
}

export function authorizationSuccess(authorization) {
    return {type: types.AUTHORIZATION_SUCCESS, authorization: authorization};
}

export function authorizationFailed(authorization) {
    return {type: types.AUTHORIZATION_FAILED, authorization: authorization};
}


export function loadLines() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return terminalService.loadLines()
                .then(function(response) {
                    if(response.status > 210){
                        throw response.statusText;
                    }
                    return JSON.parse(response);
                })
                .then(function(data) {
                     dispatch(loadLinesSuccess(data.lines));
                })
                .catch(function(error) {
                    dispatch(ajaxCallError(error));
                    throw error;
                });
    };
}

export function loadPositions(line_id) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return terminalService.loadPositions(line_id)
                .then(function(response) {
                    if(response.status > 210){
                        // error
                        throw response.statusText;
                    }
                    return JSON.parse(response);
                })
                .then(function(data) {
                    console.log(data);
                    dispatch(loadPositionsSuccess(data.positions));
                })
                .catch(function(error) {
                    dispatch(ajaxCallError(error));
                    throw error;
                });
    };
}

export function writeAction(data) {
    return function (dispatch) {
        let httpStatus = 200;
        return terminalService.writeAction(data)
                .then(function(response) {
                    httpStatus  = response.status;
                    return JSON.parse(response);
                })
                .then(function(data) {
                    if( httpStatus > 210){
                        // error
                        dispatch(writeActionFailed(data.message));
                        throw data.message; //handle in proc
                    }
                    dispatch(writeActionSuccess(data.message));
                });
    };
}

export function beginAuthorization(option) {
    return function (dispatch) {
        dispatch(askForAuthorization(option));
    };
}

export function cancelAuthorization() {
    return function (dispatch) {
        dispatch(dismissAuthorization());
    };
}

export function verifyAuthorization(authorization_data) {
    return function (dispatch) {
        let httpStatus = 200;
        return terminalService.verifyAuthorization(authorization_data)
                .then(function(response) {
                    httpStatus  = response.status;
                    return JSON.parse(response);
                })
                .then(function(data) {
                    if( httpStatus > 210){
                        // error
                        dispatch(authorizationFailed(data));
                        throw data.message; //handle in proc
                    }
                    if(data.authorization.access){
                        dispatch(authorizationSuccess(data.authorization));
                    }
                    else{
                        dispatch(authorizationFailed(data.authorization));
                    }

                 });
        };
}
