import { profileCollection } from "../../db";
import { Meteor } from "meteor/meteor";
import { MEMBERS } from "../../common";
import { attendanceCollection } from "../../db";
import { Mongo } from "meteor/mongo"
import { DateTime } from "luxon";

class MembersMethod {
    method() {
        return Meteor.methods({
            [MEMBERS.RETIEVE]: function (team) {
                let members = profileCollection.find({ team: team }).fetch()
                return members;
            },



            [MEMBERS.RETRIEVEAVEOFFICETIME]: function (userId) {
                const currentDate = DateTime.utc().startOf('day');

                const attendance = attendanceCollection.find({
                    userId: userId,
                    date: currentDate,
                    status: "Present"
                }).fetch();



                const startTime = attendance[0].startTime;
                const endTime = attendance[0].endTime;
                const startParts = startTime ? startTime.split(":") : "0";
                const endParts = endTime ? endTime.split(":") : "0";
                const startHour = parseInt(startParts[0], 10);
                const startMinute = parseInt(startParts[1], 10);
                const endHour = parseInt(endParts[0], 10);
                const endMinute = parseInt(endParts[1], 10);
                const startMinutes = startHour * 60 + startMinute;
                const endMinutes = endHour * 60 + endMinute;
                const timeDiffMinutes = endMinutes - startMinutes;
                const hours = Math.floor(timeDiffMinutes / 60);
                const minute = timeDiffMinutes % 60;
                let totalActivity = 0;
                for (let i = 0; i < attendance[0].activity.length; i++) {
                    totalActivity = totalActivity + attendance[0].activity[i].percentage;
                }
                let aveProductivity = totalActivity / attendance[0].activity.length
                let output = {
                    numberOfHours: hours,
                    numberOfMinutes: minute,
                    productivityLevel: aveProductivity,
                }


                return output;
            }
        })
    }
}


export default new MembersMethod;