import { REPORT } from "../../common";
import { attendanceCollection } from "../../db";
import { Meteor } from 'meteor/meteor';
import utilities from "../../classes/server/services/utilities";
import attendance from "../../classes/server/services/attendance";

class ReportMethods {
    method() {
        return Meteor.methods({
            [REPORT.RETREIVESUMMARY]: function () {

                let endDate = new Date();
                let startDate = utilities.getPreviousSunday(new Date(endDate));
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(0, 0, 0, 0);

                let attendanceModule = new attendance(attendanceCollection);

                let attendance_this_week = attendanceModule.getActivitiesThisWeekAll(startDate, endDate);
                let today = utilities.getAttendanceForToday(attendance_this_week);
                let yesterday = utilities.getAttendanceForYesterday(attendance_this_week);

                let totalOfficeTimeToday = utilities.getTotalOfficeTime(today);
                let totalOfficeTimeYesterday = utilities.getTotalOfficeTime(yesterday);
                let totalOfficeTimeThisWeek = utilities.getTotalOfficeTime(attendance_this_week);

                let totalActiveMemberToday = today.length > 0 ? utilities.countUniqueUsers(today) : 0;
                let totalActiveMemberYesterday = yesterday.length > 0 ? utilities.countUniqueUsers(yesterday) : 0;
                let totalActiveMemberThisWeek = attendance_this_week.length > 0 ? utilities.countUniqueUsers(attendance_this_week) : 0;



                return {
                    today: today.length > 0 ? `${totalOfficeTimeToday.hour}h : ${totalOfficeTimeToday.minute}m` : `0 : 0`,
                    percentageToday: utilities.percentageToday(totalOfficeTimeToday.hour, totalOfficeTimeYesterday.hour),
                    yesterday: yesterday.length > 0 ? `${totalOfficeTimeYesterday.hour}h : ${totalOfficeTimeYesterday.minute}m` : `0 : 0`,
                    percentageYesterday: utilities.percentageToday(totalOfficeTimeYesterday.hour, totalOfficeTimeThisWeek.hour),
                    week: attendance_this_week.length > 0 ? `${totalOfficeTimeThisWeek.hour}h : ${totalOfficeTimeThisWeek.minute}m` : "0 : 0",
                    activeToday: totalActiveMemberToday,
                    activeYesterday: totalActiveMemberYesterday,
                    activeThisWeek: totalActiveMemberThisWeek,
                }


            }
        })
    }
}


export default new ReportMethods;