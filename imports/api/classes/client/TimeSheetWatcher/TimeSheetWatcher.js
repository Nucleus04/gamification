import Watcher from "../Watcher";
import Client from "../Client";
import { ADMIN, SESSION_KEYS, TIMESHEET } from "../../../common";
import RedisVent from "../RedisVent-client";

class TimeSheetWatcher extends Watcher {
    #db = null;
    #date = null;
    #lastbasis = null;
    #username = [];
    constructor(parent) {
        super(parent);
        RedisVent.Timesheets.prepareCollection('timesheets');
        this.#db = RedisVent.Timesheets.getCollection('timesheets');

    }

    get TimesheetCollection() {
        return this.#db.find({}).fetch();
    }

    get UsersNames() {
        return this.#username;
    }

    extractTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let formatedHour = 0;
        if (hours > 12) {
            formatedHour = hours % 12
        } else {
            formatedHour = hours;
        }
        const timeString = `${formatedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        return timeString;
    }

    retrieveTimeSheet() {
        return new Promise((resolve, reject) => {
            let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
            let userId = null;
            if (profile[0].team !== ADMIN) {
                userId = Meteor.userId();
            }
            this.Parent.callFunc(TIMESHEET.RETRIEVE, { date: this.#date, lastbasis: this.#lastbasis, userId: userId }).then((result) => {
                this.#lastbasis = result[result.length - 1].date;
                this.#date = null;
                result.forEach(element => {
                    this.#db.insert(element);
                });
                resolve();
            }).catch((error) => {

            })
        })
    }


    retrieveUserInfo(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TIMESHEET.GETUSERS, id).then((result) => {
                this.#username.push(result[0]);
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }


    retrieveTopCardData() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TIMESHEET.TOPCARD).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    setDateFilter(date) {
        this.#db.remove({});
        this.#lastbasis = null;
        this.#username = [];
        this.#date = date;
    }



}


export default new TimeSheetWatcher(Client);