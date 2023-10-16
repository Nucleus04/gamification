import Watcher from "../Watcher";
import Client from "../Client";
import { GET_API_CREDENTIALS, HUBSTAFF, SESSION_KEYS } from "../../../common";

class HubstaffWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }
    generateNonce() {
        const nonceLength = 32; // Adjust the length as needed
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let nonce = '';

        for (let i = 0; i < nonceLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            nonce += charset[randomIndex];
        }

        return nonce;
    }

    getAPICredentials() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GET_API_CREDENTIALS).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
    getAccessToken(authorization_code) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(HUBSTAFF.GET_ACCESS_TOKEN, authorization_code).then((access_token) => {
                localStorage.setItem(SESSION_KEYS.access_token, JSON.stringify(access_token));
                let today = new Date();
                let expiryDate = new Date(today.getTime() + access_token.expires_in * 1000);
                localStorage.setItem(SESSION_KEYS.expires_in, expiryDate);
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    refreshAccessToken(refresh_token) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(HUBSTAFF.REFRESH_ACCESS_TOKEN, refresh_token).then((access_token) => {
                localStorage.setItem(SESSION_KEYS.access_token, JSON.stringify(access_token));
                let today = new Date();
                let expiryDate = new Date(today.getTime() + access_token.expires_in * 1000);
                localStorage.setItem(SESSION_KEYS.expires_in, expiryDate);
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }
}


export default new HubstaffWatcher(Client);