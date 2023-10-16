import Watcher from "../Watcher";
import Client from "../Client";
import { ACTIVITY, TIMELINE } from "../../../common";
import RedisVentClient from "../RedisVent-client";

class ActivityWatcher extends Watcher {
    #lastbasis = null;
    #db = null;
    #date = null;
    #projects = null;
    #history = [];
    constructor(parent) {
        super(parent);
        RedisVentClient.Activityuser.prepareCollection('activityuser');
        this.#db = RedisVentClient.Activityuser.getCollection('activityuser');
    }

    get ActivityUser() {
        return this.#db.find({}).fetch();
    }

    get Projects() {
        return this.#projects;
    }
    get History() {
        return this.#history;
    }
    retrieveActivities(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(ACTIVITY.RETRIEVEACTIVITY, { id: id, date: this.#date }).then((result) => {
                this.#history.push(result);
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    retrieveUsers() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TIMELINE.RETRIEVEUSER, this.#lastbasis).then((result) => {
                const uniqueTeamsList = result
                    .filter(element => element.project) // Filter out elements with no "project" field
                    .map(element => element.project) // Extract the "project" field
                    .filter((value, index, self) => self.indexOf(value) === index); // Get unique teams

                this.#projects = uniqueTeamsList;
                this.#lastbasis = result[result.length - 1].userId;

                result.forEach(element => {
                    this.#db.insert(element);
                });
                resolve();
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    setDate(date) {
        this.#db.remove({});
        this.#history = [];
        this.#date = date;
    }
}


export default new ActivityWatcher(Client);