import Watcher from "../Watcher";
import Client from "../Client";
import Accounts from "../Services/Accounts";
import { CREATE_PROFILE } from "../../../common";

class AuthenticationWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }

    async login(username, password) {
        let result = await Accounts.login(username, password);
        return result;
    }

    async createProfile(id, firstname, lastname, role) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(CREATE_PROFILE, { id: id, firstname: firstname, lastname: lastname, role: role }).then((result) => {
                resolve()
            }).catch((error) => {
                console.log(error);
            })
        })
    }

}


export default new AuthenticationWatcher(Client);