import Watcher from "../Watcher";
import Client from "../Client";
import { TEAMS } from "../../../common";

class TeamsWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }


    retrieveTeamsList() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TEAMS.RETRIEVE).then((result) => {

                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    retrieveMembers(team) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TEAMS.MEMBERS, team).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.logs(error);
            })
        })
    }
}


export default new TeamsWatcher(Client);