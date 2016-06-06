import authService from '../services/AuthService';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginStart() {
    return {type: types.REQUEST_LOGIN};
}

export function loginSuccess(user) {
    return {type: types.REQUEST_LOGIN_SUCCESS, user: user};
}

export function loginFailed(error) {
    return {type: types.REQUEST_LOGIN_FAILED, error: error};
}

export function logoutSuccess(user) {
    return {type: types.REQUEST_LOGOUT_SUCCESS, user: user};
}

export function logout() {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return authService.logout()
                .then(function(data) {
                    const anonym = {
                        user_id: 0,
                        lang: 'en',
                        user_firstname: '',
                        user_lastname: '',
                        options: [],
                        is_working: false,
                        is_authenticated: false
                    };
                    dispatch(logoutSuccess(anonym));
                })
                .catch(function(error) {
                    console.error(error);
                    dispatch(ajaxCallError(error));
                });
    };
}

export function loadUser() {
    return dispatch => {
        const user = window.init_app();
        if(user.is_authenticated){
            dispatch(loginSuccess(user));
        }
        else{
            const error = 'User is not authenticated.';
            dispatch(loginFailed(error));
        }
    };
}