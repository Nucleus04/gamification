

class gamification {
    /**
     * 
     * @param {*} db points system database or collection
     * @param {*} doc to be update or insert
     * @returns 
     */
    update_points_system_goals(db, doc) {
        const target = "goals";
        let points = db.find({ target: target }).fetch();
        let data = doc;
        data.target = target;
        if (points.length > 0) {
            return db.update({ target: target }, data);
        } else {
            let data = doc;
            data.target = target;
            return db.insert(data);
        }
    }
    /**
     * 
     * @param {*} db database for gamification collection
     * @param {String} userid user that will recieve the add in points
     * @param {Number} points Number of points to be added
     * @returns 
     */
    add_points(db, userid, points) {
        let userDoc = db.find({ userId: userid }).fetch();
        if (userDoc.length > 0) {
            console.log("Updating points for ", userid);
            return db.update(
                { userId: userid },
                { $inc: { points: Number(points), highest_point: Number(points) } },
            );
        } else {
            console.log("Inserting points for", userid);
            return db.insert(
                {
                    userId: userid,
                    points: Number(points),
                    highest_point: Number(points),
                    credits: 0,
                }
            )
        }
    }

    reset_points(db) {
        return db.update({}, { $set: { points: 0, highest_point: 0 } }, { multi: true });
    }

    rejected_points(db, userid, points) {
        let userDoc = db.find({ userId: userid }).fetch();
        if (userDoc.length > 0) {
            console.log("Updating points for ", userid);
            return db.update(
                { userId: userid },
                { $inc: { points: Number(points) } },
            );
        }
    }


    deduct_points(db, userId, points) {
        let userDoc = db.find({ userId: userId }).fetch();
        if (userDoc.length > 0) {
            console.log("Updating points for ", userId);
            return db.update(
                { userId: userId },
                { $inc: { points: Number(- points) } }
            );
        } else {
            console.log("Inserting points for", userId);
            return db.insert(
                {
                    userId: userId,
                    points: Number(points),
                    credits: 0,
                }
            )
        }
    }

    deduct_credit(db, userId, credits) {
        let userDoc = db.find({ userId: userId }).fetch();
        if (userDoc.length > 0) {
            console.log("Updating points for ", userId);
            return db.update(
                { userId: userId },
                { $inc: { credits: Number(- credits) } }
            );
        }
    }


    add_credits(db, userId, credits) {
        let userDoc = db.find({ userId: userId }).fetch();
        if (userDoc.length > 0) {
            return db.update(
                { userId: userId },
                { $inc: { credits: Number(credits) } }
            );
        } else {
            return db.insert(
                {
                    userId: userId,
                    points: 0,
                    credits: Number(credits),
                }
            )
        }
    }
    /**
     * 
     * @param {*} db gamification collection where data will be pull off
     * @param {String} userId id of user
     * @returns document containing points related information
     */
    retrieve_points(db, userId) {
        return db.find({ userId: userId });
    }


    update_points_system_attendance(db, point) {
        const target = "attendance";
        let data = {
            points: point,
            target: target,
        }
        let points = db.find({ target: target }).fetch();
        if (points.length > 0) {
            return db.update({ target: target }, data);
        } else {
            return db.insert(data);
        }
    }

    retrieve_attendance_points_system(db) {
        const target = "attendance";
        return db.find({ target: target }).fetch();
    }

    update_points_system_feedback(db, point) {
        const target = "feedback";
        let data = {
            points: point,
            target: target,
        }
        let points = db.find({ target: target }).fetch();
        if (points.length > 0) {
            return db.update({ target: target }, data);
        } else {
            return db.insert(data);
        }
    }

    /**
     * 
     * @param {*} db database where points will be pull off
     * @returns points
     */
    retrieve_feedback_points_system(db) {
        const target = "feedback";
        let pointsystem = db.find({ target: target }).fetch();
        return pointsystem[0].points;
    }

    /**
     * function that will update exchange rate for points and credit
     * @param {*} db database for point system
     * @param {*} point updated point
     * @param {*} credit updated credits
     * @returns 
     */
    update_exchange_rate(db, point, credit) {
        const target = "exchange";
        let data = {
            points: point,
            credits: credit,
            target: target,
        }
        let points = db.find({ target: target }).fetch();
        if (points.length > 0) {
            return db.update({ target: target }, data);
        } else {
            return db.insert(data);
        }
    }


    exchange_points(db, name, userid, credits, points) {
        const data = {
            name: name,
            userId: userid,
            credits: Number(credits),
            points: points,
            status: "pending",
            created_at: new Date(),
        }

        return db.insert(data);
    }


    get_exchange_doc(db, id) {
        return db.find({ _id: id }).fetch();
    }

    update_exchange_status(db, id, status) {
        return db.update({ _id: id }, { $set: { status: status } });
    }

    add_item(db, doc) {
        return db.insert(doc);
    }

    get_reward_item(db, id) {
        return db.find({ _id: id }).fetch();
    }

    add_to_inventory(db, userId, item) {
        let doc = {
            userId: userId,
            item: item,
            created_at: new Date(),
        }

        return db.insert(doc);

    }

}


export default new gamification;