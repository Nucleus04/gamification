

class goals {
    get_goals(db, id) {
        return db.find({ userId: id, status: { $ne: "achieved" } }, { sort: { due_date: -1 } }).fetch();
    }

    get_comments(db, id) {
        return db.find({ goalId: id }).fetch();
    }

    changeStatus(db, id, status) {
        return db.update(
            { _id: id },
            { $set: { status: status } }
        )
    }

    add_comment(db, comment, id, name) {
        let data = {
            goalId: id,
            message: comment,
            author: name,
        }
        return db.insert(data);
    }

}


export default new goals;