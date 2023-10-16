

class feedbackservices {
    #db = null;
    constructor(db) {
        this.#db = db;
    }

    submit(doc) {
        return this.#db.insert(doc);
    }
}



export default feedbackservices;