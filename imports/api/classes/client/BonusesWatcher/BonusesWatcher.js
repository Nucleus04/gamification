import Watcher from "../Watcher";
import Client from "../Client";
import { BONUSES } from "../../../common";
import { Meteor } from "meteor/meteor";
import RedisVentClient from "../RedisVent-client";

class BonusesWatcher extends Watcher {
    #db = null;
    #lastbasis = null;
    #filterId = null;
    #filter = null;
    constructor(parent) {
        super(parent);
        RedisVentClient.Bonuses.prepareCollection('bonuses');
        this.#db = RedisVentClient.Bonuses.getCollection('bonuses');
    }

    get minimongoBonus() {
        return this.#db;
    }

    /**
     * retrieve doccuments containing bonus information based on set gilter, lastbaisi, privacy and filters
     * @returns {Promise} Array of documments containing bonus information
     */
    retreiveBonuses() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(BONUSES.RETRIEVE, { lastbasis: this.#lastbasis, id: this.#filterId, filter: this.#filter }).then((result) => {
                this.#lastbasis = result[result.length - 1].date;
                result.forEach(element => {
                    this.#db.insert(element);
                });
                resolve();
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    /**
     * sets filter within the watcher 
     * @param {string} filter ("released", "pending", "null")
     */
    retrieveBonusWithFilter(filter) {
        this.#filter = filter;
        this.#db.remove({});
        this.#lastbasis = null;
        this.retreiveBonuses();

    }

    /**
     * sets prrivacy within the watcher
     * @param {string} privacy string weather "everyone" or "me"
     */
    setPrivacy(privacy) {
        this.#db.remove({});
        this.#lastbasis = null;
        if (privacy === 'me') {
            this.#filterId = Meteor.userId();
        } else {
            this.#filterId = null;
        }
    }
}



export default new BonusesWatcher(Client);