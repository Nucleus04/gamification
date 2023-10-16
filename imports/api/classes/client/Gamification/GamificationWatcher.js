import Watcher from "../Watcher";
import Client from "../Client";
import { exchangeHistory, gamificationCollection, inventoryCollection, pointSystem, rewardsCollection } from "../../../db";
import { ADMIN, REWARDS } from "../../../common";
import { Meteor } from "meteor/meteor";


class GamificationWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }

    PointsAndCredits(userId) {
        return gamificationCollection.find({ userId: userId }).fetch();
    }

    getLeaderboards

    get exchangeRate() {
        return pointSystem.find({}).fetch();
    }
    get RewardList() {
        return rewardsCollection.find({}, { sort: { created_at: -1 } }).fetch();
    }
    get Inventory() {
        return inventoryCollection.find({}, { sort: { created_at: -1 } }).fetch();
    }
    get Leaderboards() {
        return gamificationCollection.find({}, { sort: { highest_point: -1 }, limit: 3 }).fetch();
    }


    ExchangeHistory(role) {
        if (role === ADMIN) {
            return exchangeHistory.find({ status: "pending" }, { sort: { created_at: -1 } }).fetch();
        } else {
            return exchangeHistory.find({}, { sort: { created_at: -1 } }).fetch();
        }
    }

    updateRate(point, credit) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.UPDATE_RATE, { point, credit }).then((result) => {
                alert("Successfully updated!");
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    exchangePoints(profile, credits, points) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.EXCHANGE_POINTS, { profile: profile, credits: credits, points: points }).then((result) => {
                alert("Request successfully!");
                resolve();
            }).catch((error) => {
                alert("There is something wrong. Please try again.")
                console.log(error);
                reject();
            })
        })
    }

    onApprovedRequest(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.APPROVE_REQUEST, id).then((result) => {
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    onRejectRequest(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.REJECT_REQUEST, id).then((result) => {
                resolve();
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    retrieveLeaderboards() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.LEADERBOARDS).then((result) => {
                resolve(result);;
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    resetPoints() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.RESET).then(() => {
                resolve();
            }).catch((error) => {
                console.log(error);
            })
        })
    }


    addItem(doc) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.ADD_ITEM, doc).then((result) => {
                alert("Item successfully created.");
                resolve();
            }).catch((error) => {
                console.log(error);
                alert("There is something wrong");
                reject();
            })
        })
    }

    redeemRewards(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REWARDS.REDEEM_REWARD, { priceId: id, userId: Meteor.userId() }).then((result) => {
                alert("Successfully redeemed!");
            }).catch((error) => {
                alert("Tere is somthing wrong");
                console.log(error);
            })
        })
    }



}


export default new GamificationWatcher(Client);