import Watcher from "../../client/Watcher";
import Client from "../../client/Client";
import { Accounts } from "meteor/accounts-base"


class Account extends Watcher {
    constructor(parent) {
        super(parent);
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     */
    register(email, password) {
        return new Promise((resolve, reject) => {
            Accounts.createUser({ email: email, password: password }, (err) => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            })
        })
    }


    login(email, password) {
        return new Promise((resolve, reject) => {
            this.Parent.login(email, password, (error) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        })
    }
}

export default new Account(Client);