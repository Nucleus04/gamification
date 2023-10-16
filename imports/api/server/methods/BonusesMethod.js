import { Meteor } from "meteor/meteor";
import { BONUSES } from "../../common";
import { bonusesCollection } from "../../db";
import { filter } from "lodash";

class BonusesMethods {
    methods() {
        return Meteor.methods({
            /**
             * 
             * @param {string} userid 
             * @return users profile document
             */
            [BONUSES.RETRIEVE]: async function ({ lastbasis, id, filter }) {
                const lastdate = new Date(lastbasis);
                let query = {}
                if (id && lastbasis && filter) {
                    query = {
                        date: { $lt: lastdate },
                        userId: id,
                        status: filter,

                    }
                } else
                    if (id && lastbasis && !filter) {
                        query = {
                            date: { $lt: lastdate },
                            userId: id
                        }
                    } else if (!lastbasis && id && filter) {
                        query = {

                            userId: id,
                            status: filter,
                        }

                    } else if (!id && lastbasis && filter) {
                        query = {
                            date: { $lt: lastdate },
                            status: filter,
                        }
                    } else if (!id && !lastbasis && filter) {
                        console.log("filter only")
                        query = {
                            status: filter,
                        }
                    } else if (!id && lastbasis && !filter) {
                        console.log("last basis only");
                        query = {
                            date: { $lt: lastdate },

                        }
                    } else if (id && !lastbasis && !filter) {
                        query = {
                            userId: id,
                        }
                    }
                const pipeline = [
                    { $match: query },
                    { $sort: { "date": -1 } },
                    { $limit: 10 }
                ]
                let doc = await bonusesCollection.rawCollection().aggregate(pipeline).toArray();
                //let doc = bonusesCollection.find({}, { sort: { date: -1 }, limit: 10 },).fetch();
                console.log(doc);
                const output = doc.map(element => ({
                    ...element,
                    _id: element._id.toString()

                }))
                return output;
            },



        })
    }
}

export default new BonusesMethods;
