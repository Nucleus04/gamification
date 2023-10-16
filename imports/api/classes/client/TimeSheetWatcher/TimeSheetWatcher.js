import Watcher from "../Watcher";
import Client from "../Client";
import { TIMESHEET } from "../../../common";
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

    retrieveTimeSheet() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(TIMESHEET.RETRIEVE, { date: this.#date, lastbasis: this.#lastbasis }).then((result) => {
                this.#lastbasis = result[result.length - 1].date;
                this.#date = null;
                result.forEach(element => {
                    const startTime = element.startTime;
                    const endTime = element.endTime;
                    const startParts = startTime ? startTime.split(":") : "0";
                    const endParts = endTime ? endTime.split(":") : "0";
                    const startHour = parseInt(startParts[0], 10);
                    const startMinute = parseInt(startParts[1], 10);
                    const endHour = parseInt(endParts[0], 10);
                    const endMinute = parseInt(endParts[1], 10);
                    const startMinutes = startHour * 60 + startMinute;
                    const endMinutes = endHour * 60 + endMinute;
                    const timeDiffMinutes = endMinutes - startMinutes;
                    const hours = Math.floor(timeDiffMinutes / 60);
                    const minute = timeDiffMinutes % 60;
                    let totalActivity = 0;
                    for (let i = 0; i < element.activity.length; i++) {
                        totalActivity = totalActivity + element.activity[i].percentage;
                    }
                    let aveProductivity = totalActivity / element.activity.length
                    const unformatedDate = new Date(element.date);
                    let output = {
                        numberOfHours: hours,
                        numberOfMinutes: minute,
                        productivityLevel: aveProductivity,
                        userId: element.userId,
                        date: unformatedDate.toDateString(),
                    }
                    this.#db.insert(output);
                });
                resolve();
            }).catch((error) => {
                console.log(error)
                reject();
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