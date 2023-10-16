import { Meteor } from "meteor/meteor";
import { APPFEEDBACK } from "../../common";
import applicationfeedbackservices from "../../classes/server/services/applicationfeedbackservices";
import { appFeedbackCollection } from "../../db";

class AppFeedback {
    methods() {
        let feedback = new applicationfeedbackservices(appFeedbackCollection);
        return Meteor.methods({
            [APPFEEDBACK.UPLOAD]: function (doc) {
                try {
                    return feedback.upload(doc);
                } catch (error) {
                    console.log(error);
                }
            },

            [APPFEEDBACK.RETRIEVE]: function () {
                try {
                    return feedback.retrieve();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
}


export default new AppFeedback;