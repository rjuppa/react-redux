import * as EndPoints from '../constants/EndPoints';


class TerminalService {

    static loadLines(){
        console.log('TerminalService getLines');
        const opt = {
            method: 'GET',
            headers: EndPoints.HEADERS,
            credentials: 'same-origin',
            cache: 'no-cache'
        };
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', EndPoints.LINES_URL);
            xhr.setRequestHeader('Content-type', 'application/json');
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

    static loadPositions(line_id){
        console.log('TerminalService getPositions');
        const opt = {
            method: 'GET',
            headers: EndPoints.HEADERS,
            credentials: 'same-origin',
            cache: 'no-cache'
        };
        const url = EndPoints.POSITIONS_URL + '/' + line_id;
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.setRequestHeader('Content-type', 'application/json');
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

    static writeAction(actionData){
        const opt = {
            method: 'POST',
            headers: EndPoints.HEADERS,
            credentials: 'same-origin',
            cache: 'no-cache',
            body: JSON.stringify(actionData)
        };
        const url = EndPoints.ACTIONS_URL;
        //return fetch(url, opt);
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
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
            xhr.send(JSON.stringify(actionData));
        });
    }

    static verifyAuthorization(actionData){
        const opt = {
            method: 'POST',
            headers: EndPoints.HEADERS,
            credentials: 'same-origin',
            cache: 'no-cache',
            body: JSON.stringify(actionData)
        };
        const url = EndPoints.AUTHORIZATION_URL;
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
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
            xhr.send(JSON.stringify(actionData));
        });

    }
}

export default TerminalService;