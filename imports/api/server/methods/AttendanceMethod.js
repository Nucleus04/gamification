import { Meteor } from "meteor/meteor";
import { attendanceCollection, gamificationCollection, pointSystem, profileCollection } from "../../db";
import { ATTENDANCE } from "../../common";
import attendance from "../../classes/server/services/attendance";
const { DateTime } = require("luxon");
import api from "../../classes/server/services/api";
import gamification from "../../classes/server/services/gamification";
import utilities from "../../classes/server/services/utilities";

class AttendanceMethods {
    method() {
        return Meteor.methods({
            [ATTENDANCE.RETRIEVEATTENDANCE]: async function ({ date_start, date_end, userId }) {
                let startDate = new Date(date_start);
                startDate.setHours(0, 0, 0, 0);
                let endDate = new Date(date_end);
                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(0, 0, 0, 0);

                try {
                    let activities = new attendance(attendanceCollection);
                    let activityList = activities.getActivitiesThisWeekAll(startDate, endDate);
                    return activityList;
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [ATTENDANCE.REQUEST_TO_API]: async function ({ access_token, date_start, date_end, userId, point }) {
                const startDateOfPoints = new Date("2023-10-05");
                try {
                    let activities = new attendance(attendanceCollection)
                    let startDate = new Date(date_start);
                    startDate.setHours(0, 0, 0, 0);
                    let endDate = new Date(date_end);
                    endDate.setDate(endDate.getDate() + 1);
                    endDate.setHours(0, 0, 0, 0);

                    let activity_api = await api.getActivities(access_token, startDate, date_end, userId);
                    let activity_db = activities.getActivitiesThisWeek(startDate, endDate, userId);
                    let number_Of_present = activities.compare(activity_db, activity_api);

                    if (new Date(date_start) >= new Date(startDateOfPoints)) {
                        if (Number(number_Of_present) > 0) {
                            const lastAttendance = activities.getLastAttendance(userId);
                            let deduction = 0;
                            if (lastAttendance.length > 1) {
                                let { isLate, isUnderTime } = utilities.isLateAndUnderTime(lastAttendance[1]);
                                if (isLate) {
                                    deduction = deduction + 1;
                                }
                                if (isUnderTime) {
                                    deduction = deduction + 1;
                                }
                            }
                            console.log("Deduction", deduction);
                            number_Of_present = (number_Of_present * point) - deduction;
                            gamification.add_points(gamificationCollection, userId, Number(number_Of_present));
                        }
                    }
                    return true;
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [ATTENDANCE.RETRIEVENAMES]: function (id) {
                return profileCollection.find({ userId: id }).fetch();
            },

            [ATTENDANCE.CHANGE_POINTS]: function (point) {
                try {
                    return gamification.update_points_system_attendance(pointSystem, Number(point));
                } catch (error) {
                    console.log(error);
                }
            },

            [ATTENDANCE.RETEIVE_POINTS]: function () {
                try {
                    return gamification.retrieve_attendance_points_system(pointSystem);
                } catch (error) {
                    console.log(error);
                }
            }

        })
    }
}


export default new AttendanceMethods;