import Watcher from "../Watcher";
import Client from "../Client";
import { MEMBERS } from "../../../common";
import { Meteor } from "meteor/meteor";


class MemberWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }


    retrieveMembers() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(MEMBERS.RETIEVE, profile[0].team).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    retreiveAveOfficeTime(userId) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(MEMBERS.RETRIEVEAVEOFFICETIME, userId).then((result) => {
                console.log(result);
                resolve(result);
            }).catch((error) => {

            })
        })
    }
}


export default new MemberWatcher(Client);