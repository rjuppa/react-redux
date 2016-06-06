// import * as SERVER_URL from './server_address';
export const API_URL = '/terminal/api/v1/';
export const LOGIN_URL = '/terminal/default/';
export const LOGIN_URL_FAKE = '/terminal/default/auth.html';
export const LOGOUT_URL = API_URL + 'logout';

export const ACTIONS_URL = API_URL + 'actions';
export const LINES_URL = API_URL + 'lines';
export const POSITIONS_URL = API_URL + 'positions';
export const AUTHORIZATION_URL = API_URL + 'authorize';


export const HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
       // 'Origin': SERVER_URL.SERVER,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
    };