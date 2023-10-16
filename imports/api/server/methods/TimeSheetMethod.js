import { Meteor } from "meteor/meteor";
import { attendanceCollection, profileCollection } from "../../db";
import { TIMESHEET } from "../../common";
import attendance from "../../classes/server/services/attendance";
import utilities from "../../classes/server/services/utilities";

class TimesheetMethod {
    method() {
        return Meteor.methods({
            [TIMESHEET.RETRIEVE]: async function ({ date, lastbasis }) {
                let startDate = new Date(date);
                let query = {};
                if (date) {
                    query = {
                        date: { $lt: startDate }
                    }
                }
                if (lastbasis) {
                    query = {
                        date: { $lt: new Date(lastbasis) }
                    }
                }
                const pipeline = [
                    { $match: query },
                    { $sort: { "date": -1 } },
                    { $limit: 10 }
                ]
                let attendance = await attendanceCollection.rawCollection().aggregate(pipeline).toArray();
                const output = attendance.map(element => ({
                    ...element,
                    _id: element._id.toString()

                }))
                return output;

            },


            [TIMESHEET.GETUSERS]: function (id) {
                return profileCollection.find({ userId: id }).fetch();
            },

            [TIMESHEET.TOPCARD]: function () {
                let endDate = new Date();
                let startDate = utilities.getPreviousSunday(new Date(endDate));
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(0, 0, 0, 0);

                let attendanceModule = new attendance(attendanceCollection);
                let attendance_this_week = attendanceModule.getActivitiesThisWeekAll(startDate, endDate)
                let avgactivity = utilities.calculateAverageActivity(attendance_this_week);
                let activeTime = utilities.getAverageActiveTime(attendance_this_week);
                let officeTime = utilities.getAverageOfficeTime(attendance_this_week);
                return {
                    officeHour: attendance_this_week.length > 0 ? `${officeTime.hour} : ${officeTime.minute}` : 0,
                    productivity: attendance_this_week.length > 0 ? avgactivity : 0,
                    activeTime: attendance_this_week.length > 0 ? `${activeTime.hour} : ${activeTime.minute}` : 0,
                }


            }
        })
    }
}

export default new TimesheetMethod;