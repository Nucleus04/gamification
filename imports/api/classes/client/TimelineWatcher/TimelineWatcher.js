import Watcher from "../Watcher";
import Client from "../Client";
import RedisVentClient from "../RedisVent-client";
import { TIMELINE } from "../../../common";

class TimelineWatcher extends Watcher {
    #db = null;
    #date = null;
    #history = [];
    #lastbasis = null;
    constructor(parent) {
        super(parent);
        RedisVentClient.Timeline.prepareCollection('timeline');
        this.#db = RedisVentClient.Timeline.getCollection('timeline');
    }

    get TimelineCollection() {
        return this.#db;
    }
    get History() {
        return this.#history;
    }

    retrieveMembers() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TIMELINE.RETRIEVEUSER, this.#lastbasis).then((result) => {
                this.#lastbasis = result[result.length - 1].userId;
                result.forEach(element => {
                    this.#db.insert(element);
                });
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    retrieveTimeline(userid) {
        if (userid) {
            return new Promise((resolve, reject) => {
                this.Parent.callFunc(TIMELINE.RETRIEVETIMELINE, { id: userid, date: this.#date }).then((result) => {
                    this.#history.push(result);
                    resolve(result)
                }).catch((error) => {
                    console.log(error);
                })
            })
        }
    }

    setDate(date) {
        this.#date = date;
    }
}

export default new TimelineWatcher(Client);