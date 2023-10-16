import { Meteor } from "meteor/meteor";
import { ADMIN, PUBLICATION } from "../../common";
import { exchangeHistory, gamificationCollection, inventoryCollection, pointSystem, rewardsCollection } from "../../db";


class GamificationPublication {
    pointsAndCredits() {
        return Meteor.publish(PUBLICATION.GAMIFIED_POINTS_CREDITS, (userid) => {
            return gamificationCollection.find({});
        })
    }
    leaderboards() {
        return Meteor.publish(PUBLICATION.LEADERBOARDS, (userId) => {
            console.log("----userid", userId);
            return gamificationCollection.find({}, { sort: { highest_point: -1 }, limit: 3 });
        })
    }
    exchangeRate() {
        return Meteor.publish(PUBLICATION.EXCHANGE_RATE, () => {
            return pointSystem.find({ target: "exchange" });
        })
    }

    exchangeHistoryPublication() {
        return Meteor.publish(PUBLICATION.EXCHANGE_HISTORY, (role) => {
            if (role === ADMIN) {
                return exchangeHistory.find({ status: "pending" });
            } else {
                return exchangeHistory.find({ userId: role })
            }
        })
    }

    rewardList() {
        return Meteor.publish(PUBLICATION.REWARDS_LIST, () => {
            return rewardsCollection.find({});
        })
    }

    inventory() {
        return Meteor.publish(PUBLICATION.INVENTORY, (userId) => {
            return inventoryCollection.find({ userId: userId });
        })
    }
}


export default new GamificationPublication;