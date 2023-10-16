import Watcher from "../Watcher";
import Client from "../Client";
import { SETTINGS } from "../../../common";
import { Meteor } from "meteor/meteor"

class SettingWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }


    async updateProfile(firstname, lastname, timezone) {
        let id = Meteor.userId();
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(SETTINGS.UPDATEPROFILE, { firstname, lastname, timezone, id }).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
}


export default new SettingWatcher(Client);