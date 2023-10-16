

class applicationfeedbackservices {
    #db = null;
    constructor(db) {
        this.#db = db;
    }


    upload(doc) {
        return this.#db.insert(doc);
    }


    retrieve() {
        return this.#db.find({}, { sort: { created: -1 } }).fetch();
    }
}



export default applicationfeedbackservices;