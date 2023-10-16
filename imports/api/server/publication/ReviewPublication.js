import { Meteor } from 'meteor/meteor';
import { PUBLICATION } from '../../common';
import { reviewSummary } from '../../db';
class ReviewPublication {
    publication() {
        return Meteor.publish(PUBLICATION.REVIEW, () => {
            return reviewSummary.find({}, { sort: { recieved: -1 }, limit: 5 });
        })
    }

}

export default new ReviewPublication;