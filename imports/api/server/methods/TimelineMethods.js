import { Meteor } from "meteor/meteor";
import { attendanceCollection, profileCollection } from "../../db";
import { TIMELINE } from "../../common";
import { Mongo } from "meteor/mongo";
import utilities from "../../classes/server/services/utilities";

class TimelineMethods {
    method() {
        return Meteor.methods({
            [TIMELINE.RETRIEVETIMELINE]: async function ({ id, date }) {
                let startDate = null;
                if (date) {
                    startDate = new Date(date);
                } else {
                    startDate = new Date();
                }

                let day = utilities.getMondayAndFriday(startDate);

                let pipeline = [
                    {
                        $match: {
                            userId: id,
                            created_at: {
                                $gte: day.startOfWeek.toISOString(),
                                $lte: day.endOfWeek.toISOString(),
                            }
                        }
                    },
                    {
                        $sort: { created_at: -1 }
                    }
                ];

                let doc = await attendanceCollection.rawCollection().aggregate(pipeline).toArray();
                let sortedActivity = utilities.sortAttendanceByCreatedAtReverse(doc);
                let activity = []
                if (doc.length > 0) {
                    sortedActivity.forEach(element => {
                        activity.push(utilities.secondsToHourMinute(element.billable));
                    });
                }
                let output = {
                    mon: {
                        hour: activity.length > 0 ? activity[0].hour : 0,
                        min: activity.length > 0 ? activity[0].min : 0
                    },
                    tue: {
                        hour: activity.length > 1 ? activity[1].hour : 0,
                        min: activity.length > 1 ? activity[2].min : 0
                    },
                    wed: {
                        hour: activity.length > 2 ? activity[2].hour : 0,
                        min: activity.length > 2 ? activity[2].min : 0
                    },
                    thu: {
                        hour: activity.length > 3 ? activity[3].hour : 0,
                        min: activity.length > 3 ? activity[3].min : 0
                    },
                    fri: {
                        hour: activity.length > 4 ? activity[4].hour : 0,
                        min: activity.length > 4 ? activity[4].min : 0
                    },
                    total: utilities.getAverageOfficeTime(sortedActivity),
                }

                return output;

            },

            [TIMELINE.RETRIEVEUSER]: async function (lastbasis) {
                let query = lastbasis ? { userId: { $lt: lastbasis } } : {};
                let pipeline = [
                    { $match: query },
                    { $sort: { "userId": -1 } },
                    { $limit: 10 },
                ];
                let user = await profileCollection.rawCollection().aggregate(pipeline).toArray();

                const output = user.map(element => ({
                    ...element,
                    _id: element._id.toString()

                }))
                return output;


            }
        })
    }
}


export default new TimelineMethods;