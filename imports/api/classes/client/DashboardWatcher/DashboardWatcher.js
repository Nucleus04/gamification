import Watcher from "../Watcher";
import Client from "../Client";
import { Meteor } from "meteor/meteor";
import { PROFILE, DASHBOARD, SESSION_KEYS } from "../../../common";
import RedisVentClient from "../RedisVent-client";

class DashboardWatcher extends Watcher {
    #profile;
    #filter = null;
    constructor(parent) {
        super(parent);
    }

    get getProfile() {
        return this.#profile;
    }
    /**
     * 
     * Retrieve profile information of current login user
     */
    retrieveProfile() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETREIVREPROFILE, Meteor.userId()).then((result) => {
                this.#profile = result;
                localStorage.setItem(SESSION_KEYS.profile, JSON.stringify(result));
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })

    }
    /**
     * 
     * @returns total number of members
     */
    retrieveTotalMembers() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETRIEVETOTALMEMBERS, this.#profile[0].team).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
        })
    }


    retreiveInvoiceHistory() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETRIEVEINVOCESHISTORY, Meteor.userId()).then((result) => {
                let date = new Date(result.date);
                let nextpayment = date.setDate(date.getDate() + 15);
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                const formattedDate = new Date(nextpayment).toLocaleDateString('en-US', options);
                const output = {
                    amount: result.amount,
                    date: formattedDate,

                }
                resolve(output);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    retrieveProductivity(filter) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETREIVEPRODUCTIVITY, filter).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            });
        })
    }


    retrieveGoals(filter) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETRIEVEGOALS, filter).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    retrieveTodaysActivity(filter) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETRIEVETODAYSACTIVITY, filter).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error)
            })
        })
    }


    retrieveActivity(filter) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETREIVEMEMBERSACTIVITY, filter).then((result) => {
                result.forEach(item => {
                    const endTimeParts = item.endTime.split(':');
                    const startTimeParts = item.startTime.split(':');
                    const endMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);
                    const startMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
                    let duration = endMinutes - startMinutes;
                    const hour = Math.floor(duration / 60);
                    const minute = endMinutes % 60;
                    item.hours = `${hour}:${minute}`;
                    let percentage = 0
                    item.activity.forEach(element => {
                        percentage = percentage + element.percentage;
                    })
                    item.percentage = parseFloat(percentage / item.activity.length).toFixed(1);
                });
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    retrieveUserName(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETREIVEUSERNAME, id).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    retrieveTopMember() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(DASHBOARD.RETRIEVETOPMEMBER).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
}



export default new DashboardWatcher(Client);