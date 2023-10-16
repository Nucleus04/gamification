import { Meteor } from "meteor/meteor";
import { feedbackCollection, gamificationCollection, pointSystem } from "../../db";
import { FEEDBACK } from "../../common";
import feedbackservices from "../../classes/server/services/feedbackservices";
import gamification from "../../classes/server/services/gamification";


class FeedbackMethods {
    method() {
        let feedback = new feedbackservices(feedbackCollection);
        return Meteor.methods({
            [FEEDBACK.RETRIEVEFEEDBACK]: async function (id) {
                console.log(id);
                let doc = feedbackCollection.find({ userId: id }, { sort: { created_at: -1 } }).fetch();
                return doc;
            },

            [FEEDBACK.SUBMIT_FEEDBACK]: function ({ document, userId }) {
                try {
                    let points = gamification.retrieve_feedback_points_system(pointSystem);
                    let total_points = Number(document.overall_score) * points;
                    document.total_points = total_points;
                    gamification.add_points(gamificationCollection, userId, total_points);
                    return feedback.submit(document);
                } catch (error) {
                    return new Error(error);
                }
            },

            [FEEDBACK.CHANGE_POINTS_SYSTEM]: function (point) {
                try {
                    return gamification.update_points_system_feedback(pointSystem, point);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
}

export default new FeedbackMethods;