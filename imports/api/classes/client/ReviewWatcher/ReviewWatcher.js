import Watcher from "../Watcher";
import Client from "../Client";
import { REVIEW } from "../../../common";
import { Meteor } from 'meteor/meteor';
import RedisVentClient from "../RedisVent-client";
import { reviewSummary } from "../../../db";

class ReviewWatcher extends Watcher {
    #db = null;
    #lastbasis = null;
    #filterId = null;
    #totalCount = null;
    constructor(parent) {
        super(parent);
        RedisVentClient.Review.prepareCollection('reviews');
        this.#db = RedisVentClient.Review.getCollection('reviews');
    }
    /**
     * @returns Minimongo Collection containing reviews
     */
    get ReviewCollection() {
        return this.#db.find({}).fetch();
    }


    /**
     * function that will request for review list;
     * @returns {Promise} 
     */
    retrieveReviews() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REVIEW.RETRIEVEREVIEWS, { lastbasis: this.#lastbasis, id: this.#filterId }).then((result) => {
                this.#lastbasis = result[result.length - 1].date;
                result.forEach(element => {
                    this.#db.insert(element);
                });
                resolve();
            }).catch((error) => {

                reject(error);
            })
        })
    }

    /**
     * sends request to retrieve total review count of user
     * @returns {Number} total count of reviews
     */
    retreiveTotalReviewCount() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REVIEW.RETREIVEREVIEWCOUNT, Meteor.userId()).then((result) => {
                this.#totalCount = result;
                this.activateWatcher();
                console.log(result);
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    /**
     * sends request to retreive top 5 employee on reviews
     * @returns {Array} top 5 employee based on review
     */
    retrieveTopReviewedEmployee() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REVIEW.RETRIEVETOPREVIEWEDEMPLOYEE).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    /**
     * sets privacy of review to view (me or everyone)
     * @param {string} privacy 
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

    /**
     * update document to increment like count
     * @param {string} id review id
     * @returns {Promise} 
     */
    addLike(id) {
        try {
            this.#db.update({ _id: id }, { $inc: { likes: 1 } });
            this.Parent.callFunc(REVIEW.ADDLIKE, id).then((result) => {
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * 
     * @param {string} id review id
     * @returns {Promise} array of comments
     */
    countTotalComment(id) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REVIEW.RETRIEVECOOMENTCOUNT, id).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    /**
     * 
     * @param {string} input first letter of names 
     * @returns array of names that match the first letters input
     */
    recommendUser(input) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REVIEW.RECOMMENDUSERS, input).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    /**
     * 
     * @param {object} input 
     * @returns {Promise}
     */
    submitReview(input) {
        let profile = JSON.parse(localStorage.getItem('profile'));
        let data = {
            reviewee: {
                userId: input.receiver.userId,
                name: input.receiver.firstname + " " + input.receiver.lastname,
            },
            reviewer: {
                userId: Meteor.userId(),
                name: profile[0].firstname + " " + profile[0].lastname,
            },
            message: input.message,
            likes: 0,
            privacy: "everyone",
            date: new Date(),
        }
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REVIEW.SUBMITREVIEW, data).then((result) => {
                this.#db.remove({});
                this.#lastbasis = null;
                this.retrieveReviews();
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    addComment(comment, reviewId) {
        let profile = JSON.parse(localStorage.getItem('profile'));
        if (comment) {
            return new Promise((resolve, reject) => {
                this.Parent.callFunc(REVIEW.ADDCOMMENT, { comment: comment, name: profile[0].firstname + " " + profile[0].lastname, id: reviewId }).then((result) => {
                    resolve();
                }).catch((error) => {
                    console.log(error);
                })
            })
        }
    }
    get Summary() {
        return reviewSummary.find({}, { sort: { recieved: -1 } }).fetch();
    }
    get TotalCount() {
        return this.#totalCount;
    }

}



export default new ReviewWatcher(Client);