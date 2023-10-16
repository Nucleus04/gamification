import { Meteor } from "meteor/meteor";
import { attendanceCollection, profileCollection } from "../../db";
import { TIMELINE } from "../../common";
import { Mongo } from "meteor/mongo";

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

                startDate.setHours(0, 0, 0, 0); //
                // Calculate the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
                const currentDayOfWeek = startDate.getDay();

                // Calculate the start date of the current week (assuming Sunday is the first day of the week)
                const startOfWeek = new Date(startDate);
                startOfWeek.setDate(startDate.getDate() - currentDayOfWeek + 1);

                // Calculate the end date of the current week (Friday)
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);

                let pipeline = [
                    {
                        $match: {
                            userId: id,
                            date: {
                                $gte: startOfWeek,
                                $lte: endOfWeek
                            }
                        }
                    },
                    {
                        $sort: { date: -1 }
                    }
                ];

                let doc = await attendanceCollection.rawCollection().aggregate(pipeline).toArray();
                let output = {
                    mon: {
                        hour: 0,
                        min: 0
                    },
                    tue: {
                        hour: 0,
                        min: 0
                    },
                    wed: {
                        hour: 0,
                        min: 0
                    },
                    thu: {
                        hour: 0,
                        min: 0
                    },
                    fri: {
                        hour: 0,
                        min: 0
                    },
                    total: 0,
                }
                doc.map((item) => {
                    if (item.status !== "Absent") {
                        const startTimeParts = item.startTime.split(':');
                        const endTimeParts = item.endTime.split(':');

                        const startMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
                        const endMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);

                        const officeMinutes = endMinutes - startMinutes;
                        output.total += officeMinutes;

                        // Determine the day of the week for the current item's date
                        const itemDate = new Date(item.date);
                        const dayOfWeek = itemDate.getDay();

                        // Update the corresponding day's total time
                        switch (dayOfWeek) {
                            case 1: // Monday
                                output.mon.hour += Math.floor(officeMinutes / 60);
                                output.mon.min += Math.floor(officeMinutes % 60);
                                break;
                            case 2: // Tuesday
                                output.tue.hour += Math.floor(officeMinutes / 60);
                                output.tue.min += Math.floor(officeMinutes % 60);
                                break;
                            case 3: // Wednesday
                                output.wed.hour += Math.floor(officeMinutes / 60);
                                output.wed.min += Math.floor(officeMinutes % 60);
                                break;
                            case 4: // Thursday
                                output.thu.hour += Math.floor(officeMinutes / 60);
                                output.thu.min += Math.floor(officeMinutes % 60);
                                break;
                            case 5: // Friday
                                output.fri.hour += Math.floor(officeMinutes / 60);
                                output.fri.min += Math.floor(officeMinutes % 60);
                                break;
                            // Handle other days or ignore weekends (0 and 6)
                        }
                    }
                })



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