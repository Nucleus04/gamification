import { Meteor } from "meteor/meteor";
import { attendanceCollection } from "../../db";
import { ACTIVITY } from "../../common";
import utilities from "../../classes/server/services/utilities";
class ActivityMethods {
    method() {
        return Meteor.methods({
            [ACTIVITY.RETRIEVEACTIVITY]: async function ({ id, date }) {
                console.log("🚀 ~ file: ActivityMethod.js:9 ~ ActivityMethods ~ date:", date)
                try {
                    let startDate = null;
                    if (date) {
                        startDate = new Date(date);
                    } else {
                        startDate = new Date();
                    }

                    let day = utilities.getMondayAndFriday(startDate);
                    console.log("🚀 ~ file: ActivityMethod.js:19 ~ ActivityMethods ~ day:", day)

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
                    console.log("🚀 ~ file: ActivityMethod.js:36 ~ ActivityMethods ~ doc:", doc)
                    let sortedActivity = utilities.sortAttendanceByCreatedAtReverse(doc);

                    let activity = []
                    sortedActivity.forEach(element => {
                        activity.push(utilities.calculateAverageActivityPerDay(element.billable, element.overall));
                    });
                    let output = {
                        mon: activity.length > 0 ? activity[0] : 0,
                        tue: activity.length > 1 ? activity[1] : 0,
                        wed: activity.length > 2 ? activity[2] : 0,
                        thu: activity.length > 3 ? activity[3] : 0,
                        fri: activity.length > 4 ? activity[4] : 0,
                        total: doc.length > 0 ? Number(utilities.calculateAverageActivity(sortedActivity)) : 0,
                    }
                    return output;
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
}

export default new ActivityMethods;