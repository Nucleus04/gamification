import { Meteor } from 'meteor/meteor';
import { REVIEW } from '../../common';
import { reviewsCollection, reviewCommentsCollection, profileCollection, reviewSummary, } from '../../db';
import { Mongo } from "meteor/mongo";


class ReviewMethods {
    methods() {
        return Meteor.methods({
            [REVIEW.RETRIEVEREVIEWS]: async function ({ lastbasis, id }) {
                const lastdate = new Date(lastbasis);
                let query = {}
                if (id && lastbasis) {
                    query = {
                        date: { $lt: lastdate }, $or: [
                            { 'reviewer.userId': id },
                            { 'reviewee.userId': id }
                        ]
                    }
                } else if (!lastbasis && id) {
                    query = {

                        $or: [
                            { 'reviewer.userId': id },
                            { 'reviewee.userId': id }
                        ]
                    }

                } else if (!id && lastbasis) {
                    query = {
                        date: { $lt: lastdate }
                    }
                }
                const pipeline = [
                    { $match: query },
                    { $sort: { "date": -1 } },
                    { $limit: 10 }
                ]

                const reviewList = await reviewsCollection.rawCollection().aggregate(pipeline).toArray();
                const output = reviewList.map(element => ({
                    ...element,
                    _id: element._id.toString()

                }))
                return output;
            },

            [REVIEW.RETREIVEREVIEWCOUNT]: async function (userId) {
                let doc = reviewSummary.find({ userId }).fetch();
                let reviewedCount = doc[0].given
                let recievedCount = doc[0].recieved;
                return {
                    reviewedCount,
                    recievedCount,
                };
            },



            [REVIEW.RETRIEVETOPREVIEWEDEMPLOYEE]: async function () {
                const pipeline = [
                    {
                        $group: {
                            _id: '$reviewee.userId',
                            revieweeName: { $first: "$reviewee.name" },
                            reviewCount: { $sum: 1 }
                        }
                    },
                    {
                        $sort: { reviewCount: -1 }
                    },
                    {
                        $limit: 5
                    }
                ];

                const topReviewed = await reviewsCollection.rawCollection().aggregate(pipeline).toArray();
                console.log("-----", reviewsCollection.find({}, { fields: { _id: 0, reviewee: 1 }, sort: {}, limit: 5 }).fetch());

                // const topReviewed = reviewSummary.find({}, { sort: { recieved: -1 }, limit: 5 }).fetch();
                // console.log(topReviewed);

                return topReviewed;
            },


            [REVIEW.ADDLIKE]: function (id) {
                let mongoId = new Mongo.ObjectID(id);
                return reviewsCollection.update({ _id: mongoId }, { $inc: { likes: 1 } });
            },



            [REVIEW.RETRIEVECOOMENTCOUNT]: function (id) {

                let mongoId = new Mongo.ObjectID(id);
                let count = reviewCommentsCollection.find({ reviewId: mongoId }).fetch();
                return count;
            },


            [REVIEW.RECOMMENDUSERS]: function (name) {
                const regex = new RegExp(`${name}`, "i");
                console.log(name);
                return profileCollection.find({
                    $or: [
                        { firstname: { $regex: regex } },
                        { lastname: { $regex: regex } }
                    ]
                }, { limit: 3 }).fetch();
            },

            [REVIEW.SUBMITREVIEW]: function (data) {
                console.log(data);
                reviewSummary.update(
                    { userId: data.reviewer.userId },
                    { $inc: { given: 1 } },
                );
                reviewSummary.update(
                    { userId: data.reviewee.userId },
                    { $inc: { recieved: 1 } },
                )

                return reviewsCollection.insert(data);
            },

            [REVIEW.ADDCOMMENT]: function ({ comment, name, id }) {
                let reviewId = new Mongo.ObjectID(id);
                let data = {
                    reviewId: reviewId,
                    commentator: name,
                    message: comment,
                }
                return reviewCommentsCollection.insert(data);

            }
        })
    }
}


export default new ReviewMethods;