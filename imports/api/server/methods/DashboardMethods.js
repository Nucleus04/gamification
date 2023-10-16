import { Meteor } from "meteor/meteor";
import { PROFILE, DASHBOARD } from "../../common";
import { profileCollection, invoicesCollection, attendanceCollection, goalsCollection, ratingsCollection } from "../../db";
const { DateTime } = require("luxon");

class DashboardMethods {
    methods() {
        return Meteor.methods({
            /**
             * 
             * @param {string} userid 
             * @return users profile document
             */
            [DASHBOARD.RETREIVREPROFILE]: function (userId) {
                let doc = profileCollection.find({ userId: userId }).fetch();
                return doc;
            },

            /**
             * 
             * @param {string} team 
             * @returns total number of members
             */
            [DASHBOARD.RETRIEVETOTALMEMBERS]: function (team) {
                let members = profileCollection.find({ team: team }).fetch();
                return members.length;
            },

            /**
             * 
             * @param {string} userId  
             * @returns Document containing latest invoice
             */
            [DASHBOARD.RETRIEVEINVOCESHISTORY]: function (userId) {
                let lastInvoice = invoicesCollection.find({ userId: userId }, { sort: { date: -1 }, limit: 1 }).fetch();
                return lastInvoice[0];
            },


            [DASHBOARD.RETREIVEPRODUCTIVITY]: async function (filter) {
                let productive = 0, neutral = 0, nonproductive = 0;

                let startDate = null;
                if (filter === "yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day to get yesterday's date
                    startDate = yesterday;
                } else if (filter === "month") {
                    startDate = null;
                } else {
                    startDate = new Date();
                }

                let pipeline = null;
                if (startDate) {
                    startDate = startDate.toISOString();
                    let convertedDate = DateTime.fromISO(startDate, { zone: 'utc' });
                    const inputdate = convertedDate.startOf("day");
                    pipeline = [
                        { $match: { date: inputdate } },
                        {
                            $project: {
                                _id: 0, // Exclude the _id field
                                averagePercentage: { $avg: "$activity.percentage" } // Calculate the average of activity.percentage
                            }
                        }
                    ];
                } else {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                    pipeline = [
                        {
                            $match: {
                                date: {
                                    $gte: thirtyDaysAgo, // Match documents with a date greater than or equal to thirty days ago
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0, // Exclude the _id field
                                averagePercentage: { $avg: "$activity.percentage" } // Calculate the average of activity.percentage
                            }
                        },
                        { $sort: { date: -1 } }, // Sort by date in descending order (latest first)
                    ];
                }
                let doc = await attendanceCollection.rawCollection().aggregate(pipeline).toArray();
                doc.forEach(element => {

                    if (element.averagePercentage >= 60) {
                        productive = productive + 1;
                    } else if (element.averagePercentage > 40 && element.averagePercentage < 60) {
                        neutral = neutral + 1;
                    }
                    else {
                        nonproductive = nonproductive + 1;
                    }
                })

                productive = Math.floor((productive / doc.length) * 100);
                neutral = Math.floor((neutral / doc.length) * 100);
                nonproductive = Math.floor((nonproductive / doc.length) * 100);

                return {
                    productive, neutral, nonproductive
                }
            },


            [DASHBOARD.RETRIEVEGOALS]: async function (filter) {
                let startDate = null;
                if (filter === "yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day to get yesterday's date
                    startDate = yesterday;
                } else if (filter === "month") {
                    startDate = null;
                } else {
                    startDate = new Date();
                }

                let pipeline = null;
                if (startDate) {

                    startDate.setUTCHours(0, 0, 0, 0);

                    console.log(startDate);
                    console.log(new Date(startDate.getTime() + 24 * 60 * 60 * 1000))
                    pipeline = [
                        {
                            $match: {
                                created_At: { $gte: startDate, $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000) }
                            }
                        },
                        {
                            $project: {
                                _id: 0, // Exclude the _id field
                                status: 1, // Include the 'status' field in the output
                            }
                        }
                    ];
                } else {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                    pipeline = [
                        {
                            $match: {
                                created_At: {
                                    $gte: thirtyDaysAgo, // Match documents with a date greater than or equal to thirty days ago
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0, // Exclude the _id field
                                status: 1 // Calculate the average of activity.percentage
                            }
                        },
                        { $sort: { created_At: -1 } }, // Sort by date in descending order (latest first)
                    ];
                }

                let achieved = 0, deffered = 0, inprogress = 0;
                let doc = await goalsCollection.rawCollection().aggregate(pipeline).toArray();

                doc.forEach(item => {
                    if (item.status === "achieved") {
                        achieved = achieved + 1;
                    } else if (item.status === "deferred") {
                        deffered = deffered + 1;
                    } else {
                        inprogress = inprogress + 1;
                    }
                })
                return {
                    achieved: Math.floor(achieved / doc.length * 100),
                    deffered: Math.floor(deffered / doc.length * 100),
                    inprogress: Math.floor(inprogress / doc.length * 100),
                }

            },



            [DASHBOARD.RETRIEVETODAYSACTIVITY]: async function (filter) {
                let startDate = null;
                if (filter === "yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day to get yesterday's date
                    startDate = yesterday;
                } else {
                    startDate = new Date();
                    //startDate.setDate(startDate.getDate() - 1)
                }


                startDate.setUTCHours(0, 0, 0, 0);
                let pipeline = [
                    {
                        $match: {
                            date: { $gte: startDate, $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000) }
                        },

                    },
                ];
                let doc = await attendanceCollection.rawCollection().aggregate(pipeline).toArray();
                let employee = profileCollection.find({}).fetch();
                let totalNumberOfEmployee = employee.length;
                let present = 0, earlyleave = 0, lesstracking = 0, absent = 0, late = 0;
                let endshift = 1010; // 5:00pm
                let startshift = 420;
                doc.forEach(item => {
                    if (item.status === "Present") {
                        const endTimeParts = item.endTime.split(':');
                        const startTimeParts = item.startTime.split(':');
                        const endMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);
                        const startMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
                        present = present + 1;
                        if (endMinutes < endshift) {
                            earlyleave = earlyleave + 1;
                        }
                        if (startMinutes > startshift) {
                            late = late + 1;
                        }
                        let productivityPerDay = 0;
                        item.activity.forEach((items) => {
                            if (items.percentage > 30) {
                                productivityPerDay = productivityPerDay + items.percentage;
                            }

                        })
                        productivityPerDay = productivityPerDay / item.activity.length;
                        if (productivityPerDay < 50) {
                            lesstracking = lesstracking + 1;
                        }

                    } else {
                        absent = absent + 1;
                    }
                })
                return {
                    present: present,
                    earlyleave: Math.floor(earlyleave / totalNumberOfEmployee * 100),
                    lesstracking: Math.floor(lesstracking / totalNumberOfEmployee * 100),
                    absent: absent,
                    late: Math.floor(late / totalNumberOfEmployee * 100),
                    totalNumberOfEmployee: totalNumberOfEmployee,
                }
            },


            [DASHBOARD.RETREIVEMEMBERSACTIVITY]: async function (filter) {
                let startDate = null;
                if (filter === "yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day to get yesterday's date
                    startDate = yesterday;
                } else {
                    startDate = new Date();
                }

                startDate.setUTCHours(0, 0, 0, 0);
                console.log("userrrrrr", startDate, new Date(startDate.getTime() + 24 * 60 * 60 * 1000))
                let pipeline = [
                    {
                        $match: {
                            date: { $gte: startDate, $lte: new Date(startDate.getTime() + 24 * 60 * 60 * 1000) }, status: "Present",
                        },
                    },
                    { $limit: 4 }
                ];
                let doc = await attendanceCollection.rawCollection().aggregate(pipeline).toArray();
                console.log(doc);
                return doc;

            },

            [DASHBOARD.RETREIVEUSERNAME]: function (id) {
                return profileCollection.find({ userId: id }).fetch();
            },

            [DASHBOARD.RETRIEVETOPMEMBER]: function () {
                let doc = ratingsCollection.find({}, { sort: { rating: -1 }, limit: 5 }).fetch();
                return doc;
            }
        })
    }
}

export default new DashboardMethods;
