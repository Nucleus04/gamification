import Watcher from "../Watcher";
import Client from "../Client";
import { APPFEEDBACK } from "../../../common";

class AppFeedbackWatcher extends Watcher {
    #feedback = [];
    constructor(parent) {
        super(parent);
    }
    get Feedback() {
        return this.#feedback;
    }

    uploadFeedback(doc) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(APPFEEDBACK.UPLOAD, doc).then((result) => {
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }


    retrieveFeedabck() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(APPFEEDBACK.RETRIEVE).then((result) => {
                this.#feedback = result;
                this.activateWatcher();
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }
}



export default new AppFeedbackWatcher(Client);