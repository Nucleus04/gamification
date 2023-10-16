import { Meteor } from "meteor/meteor";
import { PUBLICATION } from "../../common";
import { goalsCollection, pointSystem } from "../../db";

class GoalsPublication {
    publication() {
        return Meteor.publish(PUBLICATION.GOALS_ADMIN, () => {
            let goalsList = goalsCollection.find({ status: { $ne: "achieved" } });
            return goalsList;
        })
    }
    /**
     * publication for points system for goals
     * @returns publication
     */
    pointsystem() {
        return Meteor.publish(PUBLICATION.POINTSYSTEM, () => {
            return pointSystem.find({ target: "goals" });
        })
    }

    userGoalspublication() {
        return Meteor.publish(PUBLICATION.USERGOALS, function (userid) {
            if (userid) {
                return goalsCollection.find({ userId: userid, status: { $ne: "achieved" } });
            }
        })
    }
}


export default new GoalsPublication;