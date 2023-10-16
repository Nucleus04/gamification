import { Meteor } from "meteor/meteor";
import { attendanceCollection } from "../../db";
import { ACTIVITY } from "../../common";
class ActivityMethods {
    method() {
        return Meteor.methods({
            [ACTIVITY.RETRIEVEACTIVITY]: async function ({ id, date }) {
                console.log(date);
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
                startOfWeek.setDate(startDate.getDate() - currentDayOfWeek);

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
                    mon: 0,
                    tue: 0,
                    wed: 0,
                    thu: 0,
                    fri: 0,
                    total: 0,
                }
                let countOfDaysPresent = 0
                const calculateAverage = (activity) => {
                    let total = 0;
                    for (let i = 0; i < activity.length; i++) {
                        total += activity[i].percentage;
                    }
                    if (total !== 0) {
                        countOfDaysPresent += 1;
                    }
                    return Math.floor(total / activity.length);
                }

                doc.map((item) => {

                    if (item.status !== "Absent") {
                        const itemDate = new Date(item.date);
                        const dayOfWeek = itemDate.getDay();

                        let ave = calculateAverage(item.activity);
                        // Update the corresponding day's total time
                        switch (dayOfWeek) {
                            case 1: // Monday
                                output.mon = ave;
                                break;
                            case 2: // Tuesday
                                output.tue = ave;
                                break;
                            case 3: // Wednesday
                                output.wed = ave;
                                break;
                            case 4: // Thursday
                                output.thu = ave;
                                break;
                            case 5: // Friday
                                output.fri = ave;
                                break;
                            // Handle other days here, or ignore weekends (0 and 6)
                        }

                    }
                })
                output.total = Math.floor((output.mon + output.tue + output.wed + output.thu + output.fri) / countOfDaysPresent);
                return output;
            }
        })
    }
}

export default new ActivityMethods;