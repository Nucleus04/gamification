import { TEAMS } from "../../common";
import { profileCollection } from "../../db";
import { Meteor } from 'meteor/meteor';


class TeamsMethod {
    method() {
        return Meteor.methods({
            [TEAMS.RETRIEVE]: async function () {
                const uniqueTeams = await profileCollection.rawCollection().aggregate([
                    { $group: { _id: "$team", count: { $sum: 1 } } },
                    { $project: { _id: 0, team: "$_id", count: 1, } },
                ]).toArray();

                return uniqueTeams;
            },


            [TEAMS.MEMBERS]: async function (team) {
                let members = profileCollection.find({ team: team }).fetch();
                return members;
            }
        })
    }
}

export default new TeamsMethod;