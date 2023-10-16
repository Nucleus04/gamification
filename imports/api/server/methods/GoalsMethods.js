import gamification from "../../classes/server/services/gamification";
import { GOALS } from "../../common";
import { gamificationCollection, goalsCollection, goalsCommentCollection, pointSystem } from "../../db";
import { Meteor } from "meteor/meteor";
import goals from "../../classes/server/services/goals";


class GoalsMethods {
    methods() {
        return Meteor.methods({
            [GOALS.RETRIEVE]: function (id) {
                try {
                    return goals.get_goals(goalsCollection, id);
                } catch (error) {
                    console.log(error);
                }
                return doc;

            },
            [GOALS.GETCOMMENTS]: function (goalId) {
                try {
                    return goals.get_comments(goalsCommentCollection, goalId);
                } catch (error) {
                    console.log(error);
                }
            },

            [GOALS.ADDGOALS]: function ({ id, description, due_date }) {
                let newDateFormat = new Date(due_date);
                const data = {
                    userId: id,
                    description: description,
                    status: "inProgress",
                    percentage: 0,
                    due_date: newDateFormat,
                    created_At: new Date(),

                }
                return goalsCollection.insert(data);

            },
            [GOALS.ADDCOMMENR]: function ({ comment, id, name }) {
                try {
                    return goals.add_comment(goalsCommentCollection, comment, id, name);
                } catch (error) {
                    console.log(error);
                }
            },

            [GOALS.DELETEGOALS]: function (id) {
                return goalsCollection.remove(id);
            },

            [GOALS.UPDATEPOINTS]: function (doc) {
                return gamification.update_points_system_goals(pointSystem, doc);
            },
            [GOALS.COMPPLETEDGOAL]: function ({ id, point }) {
                try {
                    return gamification.add_points(gamificationCollection, id, point);
                } catch (error) {
                    console.log(error);
                }
            },
            [GOALS.UPDATESTATUS]: function (id) {
                const status = "achieved";
                try {
                    return goals.changeStatus(goalsCollection, id, status);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
}


export default new GoalsMethods;