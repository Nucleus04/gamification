import Watcher from "../Watcher";
import Client from "../Client";
import { FEEDBACK } from "../../../common";
import { result } from "lodash";
import { feedbackCollection, pointSystem } from "../../../db";

class FeedbackWatcher extends Watcher {
    #feedback = [];
    #feedbackNewAve = null;
    constructor(parent) {
        super(parent);
    }
    get Feedback() {
        return this.#feedback;
    }
    get feedbackNewAve() {
        return this.#feedbackNewAve;
    }
    get PointSystem() {
        return pointSystem.find({}).fetch();
    }
    get FeedbackList() {
        return feedbackCollection.find({}, { sort: { created_at: -1 } }).fetch();
    }

    async getAverage(feedback) {
        let totalcom = 0, totalteam = 0, totalint = 0, totalacc = 0;
        feedback.forEach(item => {
            totalcom = totalcom + Number(item.communication);
            totalteam = totalteam + Number(item.teamwork);
            totalint = totalint + Number(item.integrity);
            totalacc = totalacc + Number(item.accountability);
        })
        this.#feedbackNewAve = {
            communication: parseFloat(totalcom / feedback.length).toFixed(2),
            teamwork: parseFloat(totalteam / feedback.length).toFixed(2),
            integrity: parseFloat(totalint / feedback.length).toFixed(2),
            accountability: parseFloat(totalacc / feedback.length).toFixed(2),
        }
    }

    retrieveFeedbacks() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(FEEDBACK.RETRIEVEFEEDBACK, Meteor.userId()).then((result) => {
                this.getAverage(result);
                this.#feedback = result;
                this.activateWatcher();
                resolve();
            }).catch((error) => {
                console.log(error)
            })
        })
    }


    submitFeedback(document, userId) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(FEEDBACK.SUBMIT_FEEDBACK, { document: document, userId: userId }).then((result) => {
                alert('Feedback has been submited successfully');
                resolve();
            }).catch((error) => {
                console.log(error);
                alert("There is something worng. Please try again.")
                reject();
            })
        })
    }


    changePointSystem(point) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(FEEDBACK.CHANGE_POINTS_SYSTEM, point).then((result) => {
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }
}


export default new FeedbackWatcher(Client);