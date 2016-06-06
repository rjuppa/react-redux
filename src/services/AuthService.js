import * as EndPoints from '../constants/EndPoints';


function processStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

class AuthService {

    static login(credits) {
        console.log('AuthService login');
        console.log(EndPoints.LOGIN_URL);
        const opt = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
                'User-Agent': 'Mozilla/5.1 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
            },
            credentials: 'same-origin',
            cache: 'no-cache',
            body: 'chipcard_num=' + credits.chipcard_num + '&mac_address=' + credits.mac_address
        };

        console.log(opt);
        return fetch(EndPoints.LOGIN_URL, opt);
    }

    static logout(){
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', EndPoints.LOGOUT_URL);
            xhr.onload = function(){
                if(this.status >= 200 && this.status < 300){
                    resolve(xhr.response);
                }
                else{
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function(){
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });

    }

}

export default AuthService;
