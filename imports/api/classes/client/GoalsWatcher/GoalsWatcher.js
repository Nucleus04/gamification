import Watcher from "../Watcher";
import Client from "../Client";
import { GOALS } from "../../../common";
import { Meteor } from 'meteor/meteor';
import RedisVent from "../RedisVent-client";
import { goalsCollection, pointSystem } from "../../../db";

class GoalsWatcher extends Watcher {
    #db = null;
    constructor(parent) {
        super(parent);
        RedisVent.Goals.prepareCollection('goals');
        this.#db = RedisVent.Goals.getCollection('goals');
    }

    get GoalsMinimongo() {
        return this.#db;
    }

    get Goals() {
        return goalsCollection.find({}, { sort: { due_date: -1 } }).fetch();
    }
    get Points() {
        return pointSystem.find({ target: "goals" }).fetch();

    }

    retreiveGoals() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GOALS.RETRIEVE, Meteor.userId()).then((result) => {
                let summary = {
                    atrisk: 0,
                    behind: 0,
                    ontrack: 0,
                }
                result.forEach(element => {
                    const dueDate = new Date(element.due_date);
                    const currentDate = new Date();
                    const timeDifferenceMs = dueDate - currentDate;
                    const timeDifferenceDays = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

                    if (timeDifferenceDays > 2) {
                        summary.ontrack = summary.ontrack + 1;
                    } else if (timeDifferenceDays < 3 && timeDifferenceDays > 0) {
                        summary.atrisk = summary.atrisk + 1;
                    } else if (timeDifferenceDays <= 0) {
                        summary.behind = summary.behind + 1;
                    }
                    this.#db.insert(element);
                });
                resolve(summary);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
    retrieveComment(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GOALS.GETCOMMENTS, id).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    addGoals(description, due_date) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GOALS.ADDGOALS, { id: Meteor.userId(), description: description, due_date: due_date }).then((result) => {
                this.#db.remove({});
                this.retreiveGoals();
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    async addComment(comment, id) {
        if (comment) {
            let profile = JSON.parse(localStorage.getItem('profile'));
            return new Promise((resolve, reject) => {
                this.Parent.callFunc(GOALS.ADDCOMMENR, { comment: comment, id: id, name: profile[0].firstname + " " + profile[0].lastname }).then(() => {
                    resolve();
                }).catch((error) => {
                    console.log(error);
                })
            })
        }
    }

    deleteGoals(id) {
        return new Promise((resolve, reject) => {
            this.#db.remove({ _id: id });
            this.Parent.callFunc(GOALS.DELETEGOALS, id).then((result) => {
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    updatePoints(doc) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GOALS.UPDATEPOINTS, doc).then((result) => {
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    completeGoal(userid, points) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GOALS.COMPPLETEDGOAL, { id: userid, point: points }).then((result) => {
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    changeStatus(goalId) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GOALS.UPDATESTATUS, goalId).then((result) => {
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            });
        })
    }


}



export default new GoalsWatcher(Client);