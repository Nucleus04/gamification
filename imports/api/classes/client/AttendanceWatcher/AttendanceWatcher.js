import Watcher from "../Watcher";
import Client from "../Client";
import { ATTENDANCE } from "../../../common";
import RedisVentClient from "../RedisVent-client";
import { pointSystem } from "../../../db";
import { SESSION_KEYS, HUBSTAFF } from "../../../common";

class AttendanceWatcher extends Watcher {
    #db = null;
    #query = {};
    #date = null;
    #point = 0;
    #name = []
    constructor(props) {
        super(props);
        RedisVentClient.Attendance.prepareCollection("attendance");
        this.#db = RedisVentClient.Attendance.getCollection("attendance");
    }
    get Attendance() {
        return this.#db.find(this.#query).fetch();
    }
    get Names() {
        return this.#name;
    }

    get Point() {
        return pointSystem.find({ target: "attendance" }).fetch();
    }
    retrieveAttendance(date_start, date_end) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(ATTENDANCE.RETRIEVEATTENDANCE, { date_start: date_start, date_end: date_end, userId: Meteor.userId() }).then((result) => {
                this.#db.remove({});
                result.forEach(element => {
                    this.#db.insert(element);
                });
                resolve();
            }).catch((error) => {
                console.log(error);
            });
        })
    }
    refreshAccessToken(refresh_token) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(HUBSTAFF.REFRESH_ACCESS_TOKEN, refresh_token).then((access_token) => {
                localStorage.setItem(SESSION_KEYS.access_token, JSON.stringify(access_token));
                let today = new Date();
                let expiryDate = new Date(today.getTime() + access_token.expires_in * 1000);
                localStorage.setItem(SESSION_KEYS.expires_in, expiryDate);
                resolve(access_token);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }
    async checkExpiryDate(access_token) {
        let expires_in = localStorage.getItem(SESSION_KEYS.expires_in);
        let expriyDate = new Date(expires_in);
        let currentDate = new Date();

        return new Promise((resolve, reject) => {
            if (currentDate.getTime() > expriyDate.getTime()) {
                this.refreshAccessToken(access_token.refresh_token).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                resolve(false);
            }
        })
    }

    async requestActivityToApi(access_token, date_start, date_end) {
        await this.retrievePoints();
        let isExpired = await this.checkExpiryDate(access_token);
        let token = "";
        if (isExpired !== false) {
            token = isExpired.access_token;
        } else {
            token = access_token.access_token;
        }
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(ATTENDANCE.REQUEST_TO_API, { access_token: token, date_start: date_start, date_end: date_end, userId: Meteor.userId(), point: this.#point }).then((result) => {
                this.retrieveAttendance(date_start, date_end);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }
    setDate(date) {
        this.#db.remove({});
        this.#name = [];
        this.#date = date;
    }

    retrieveNames(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(ATTENDANCE.RETRIEVENAMES, id).then((result) => {
                this.#name.push(result);
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    changePointsEquivalent(point) {
        return new Promise((resolve, reject) => {
            this.#point = Number(point);
            this.Parent.callFunc(ATTENDANCE.CHANGE_POINTS, point).then((result) => {
                resolve();
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    retrievePoints() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(ATTENDANCE.RETEIVE_POINTS).then((result) => {
                if (result.length > 0) {
                    this.#point = result[0].points;
                    resolve(result[0].points);
                    this.activateWatcher();
                } else {
                    resolve(0);
                }

            }).catch((error) => {
                console.log(error);
            })
        })
    }

}



export default new AttendanceWatcher(Client);