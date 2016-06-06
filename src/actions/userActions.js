import terminalService from '../services/TerminalService';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function preSelectActionDone(action) {
    return {type: types.PRE_SELECT_ACTION, action: action};
}

export function selectLanguage(lang) {
    return {type: types.SET_LANGUAGE, lang: lang};
}

export function preSelectAction(action) {
    return dispatch => {
        dispatch(preSelectActionDone(action));
    };
}

export function selectLanguageAction(lang) {
    return dispatch => {
        dispatch(selectLanguage(lang));
    };
}