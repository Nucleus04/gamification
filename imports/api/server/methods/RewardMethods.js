import { Meteor } from "meteor/meteor";
import { REWARDS } from "../../common";
import gamification from "../../classes/server/services/gamification";
import { exchangeHistory, gamificationCollection, inventoryCollection, pointSystem, rewardsCollection } from "../../db";


class RewardsMethods {
    methods() {
        return Meteor.methods({
            [REWARDS.UPDATE_RATE]: function ({ point, credit }) {
                console.log(point, credit);
                try {
                    return gamification.update_exchange_rate(pointSystem, point, credit);
                } catch (error) {
                    console.log(error);
                }
            },

            [REWARDS.EXCHANGE_POINTS]: function ({ profile, credits, points }) {
                try {
                    console.log(profile, credits);
                    let name = profile.firstname + " " + profile.lastname;
                    gamification.deduct_points(gamificationCollection, profile.userId, points);
                    return gamification.exchange_points(exchangeHistory, name, profile.userId, credits, points);
                } catch (error) {
                    console.log(error);
                }
            },

            [REWARDS.APPROVE_REQUEST]: function (id) {
                try {
                    let doc = gamification.get_exchange_doc(exchangeHistory, id);
                    gamification.add_credits(gamificationCollection, doc[0].userId, doc[0].credits);
                    return gamification.update_exchange_status(exchangeHistory, id, "approved");
                } catch (error) {
                    console.log(error);
                }
            },

            [REWARDS.REJECT_REQUEST]: function (id) {
                try {
                    let doc = gamification.get_exchange_doc(exchangeHistory, id);
                    gamification.rejected_points(gamificationCollection, doc[0].userId, doc[0].points);
                    return gamification.update_exchange_status(exchangeHistory, id, "rejected");
                } catch (error) {
                    console.log(error);
                }
            },

            [REWARDS.LEADERBOARDS]: function () {
                try {
                    return gamificationCollection.find({ points: { $gt: 0 } }, { sort: { highest_point: -1 }, limit: 3 }).fetch();
                } catch (error) {
                    console.log(error);
                }
            },

            [REWARDS.RESET]: function () {
                try {
                    return gamification.reset_points(gamificationCollection);
                } catch (error) {
                    console.log(error);
                }
            },


            [REWARDS.ADD_ITEM]: function (doc) {
                try {
                    return gamification.add_item(rewardsCollection, doc)
                } catch (error) {
                    console.log(error);
                }
            },

            [REWARDS.REDEEM_REWARD]: function ({ priceId, userId }) {

                try {
                    let price = gamification.get_reward_item(rewardsCollection, priceId);
                    gamification.deduct_credit(gamificationCollection, userId, Number(price[0].price));
                    let item = {
                        name: price[0].name,
                        description: price[0].description,
                    }
                    return gamification.add_to_inventory(inventoryCollection, userId, item);
                } catch (error) {
                    console.log(error);
                }

            }
        })
    }
}


export default new RewardsMethods;