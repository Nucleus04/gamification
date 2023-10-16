import { Mongo } from 'meteor/mongo';


export const profileCollection = new Mongo.Collection('profiles', {
    idGeneration: "MONGO",
});
export const invoicesCollection = new Mongo.Collection('invoices');
export const reviewsCollection = new Mongo.Collection('reviews', {
    idGeneration: 'MONGO',
});
export const reviewCommentsCollection = new Mongo.Collection('review-comments');
export const bonusesCollection = new Mongo.Collection('bonuses');
export const goalsCollection = new Mongo.Collection('goals', {
    idGeneration: "MONGO",
});
export const goalsCommentCollection = new Mongo.Collection('goalscomments');

export const membersCollection = new Mongo.Collection('members');
export const attendanceCollection = new Mongo.Collection('attendances');
export const feedbackCollection = new Mongo.Collection('feedbacks');
export const ratingsCollection = new Mongo.Collection('ratings');
export const reviewSummary = new Mongo.Collection('review-summaries');
export const pointSystem = new Mongo.Collection("point-system");
export const gamificationCollection = new Mongo.Collection("gamification");
export const exchangeHistory = new Mongo.Collection("exchange-history", {
    idGeneration: "MONGO",
});


export const rewardsCollection = new Mongo.Collection("rewards", {
    idGeneration: "MONGO",
});

export const inventoryCollection = new Mongo.Collection("inventory", {
    idGeneration: "MONGO",
})