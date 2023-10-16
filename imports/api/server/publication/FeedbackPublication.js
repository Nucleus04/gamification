import { } from "meteor/meteor";
import { PUBLICATION } from "../../common";
import { feedbackCollection, pointSystem } from "../../db";

class FeedbackPublication {
    point_system() {
        return Meteor.publish(PUBLICATION.FEEDBACK_POINTSYSTEM, () => {
            return pointSystem.find({ target: "feedback" });
        })
    }

    feedback() {
        return Meteor.publish(PUBLICATION.FEEDBACK_LIST, (id) => {
            return feedbackCollection.find({ userId: id });
        })
    }
}


export default new FeedbackPublication;