
class attendance {
    constructor(database) {
        this.database = database;
    }
    /**
     * insert data to activity collection
     * @param {*} data 
     */
    insert(data) {
        data.forEach(element => {
            this.database.insert(element);
        });
    }
    /**
     * update specific document in activity collection
     * @param {string} id 
     * @param {object} data 
     */
    update(id, data) {
        this.database.update({ id: id }, { $set: {}, data });
    }
    /**
     * Function to return activities from start date to present
     * @param {Date} startDate 
     * @param {String} userId 
     * @returns Array of documents containing acitivities this week
     */
    getActivitiesThisWeek(startDate, endDate, userId) {
        let date = new Date(startDate).toISOString();
        let end = new Date(endDate).toISOString();
        let document = this.database.find({ userId: userId, created_at: { $gte: date, $lte: end } }).fetch();
        return document;
    }
    getActivitiesThisWeekAll(startDate, endDate) {
        let date = new Date(startDate).toISOString();
        let end = new Date(endDate).toISOString();
        let document = this.database.find({ created_at: { $gte: date, $lte: end } }).fetch();
        return document;
    }
    isEqual(value, other) {
        // Handle simple data types
        if (value === other) {
            return true;
        }

        // Handle null or undefined values
        if (value == null || other == null) {
            return value === other;
        }

        // Handle arrays
        if (Array.isArray(value) && Array.isArray(other)) {
            if (value.length !== other.length) {
                return false;
            }
            for (let i = 0; i < value.length; i++) {
                if (!isEqual(value[i], other[i])) {
                    return false;
                }
            }
            return true;
        }

        // Handle objects
        if (typeof value === 'object' && typeof other === 'object') {
            const keysA = Object.keys(value);
            const keysB = Object.keys(other);

            if (keysA.length !== keysB.length) {
                return false;
            }

            for (const key of keysA) {
                if (!this.isEqual(value[key], other[key])) {
                    return false;
                }
            }

            return true;
        }

        // Values are not equal
        return false;
    }
    omit(object, keysToOmit) {
        if (!object || typeof object !== 'object') {
            throw new Error('The first argument must be an object.');
        }

        if (!Array.isArray(keysToOmit)) {
            throw new Error('The second argument must be an array of keys to omit.');
        }

        const result = {};
        for (const key in object) {
            if (object.hasOwnProperty(key) && !keysToOmit.includes(key)) {
                result[key] = object[key];
            }
        }
        return result;
    }
    /**
     * Accepts array of object from db and api and update and insert necessary data
     * @param {Array} activity_list_db 
     * @param {Array} activity_list_api 
     */

    compare(activity_list_db, activity_list_api) {
        let arr_to_insert = [];
        let arr_to_update = [];
        if (activity_list_db.length > 0) {
            for (let i = 0; i < activity_list_api.length; i++) {
                let need_to_insert = true;
                for (let j = 0; j < activity_list_db.length; j++) {
                    const fieldsToRemove = ['_id'];
                    let db_value = this.omit(activity_list_db[j], fieldsToRemove);
                    let equal = this.isEqual(activity_list_api[i], db_value);
                    if (activity_list_api[i].id === activity_list_db[j].id) {
                        need_to_insert = false;
                        if (!equal) {
                            arr_to_update.push(activity_list_api[i]);
                            break;
                        }
                    }
                }
                if (need_to_insert) {
                    arr_to_insert.push(activity_list_api[i]);
                }

            }
        } else {
            arr_to_insert = activity_list_api;
        }

        if (arr_to_insert.length > 0) {
            this.insert(arr_to_insert);
        }

        console.log("Need to update", arr_to_update);
        console.log("Need to insert", arr_to_insert);
        if (arr_to_update > 0) {
            arr_to_update.forEach((element) => {
                this.update(element.id, element);
            })
        }

        return arr_to_insert.length;
    }

    getAll(userId) {
        let activities = this.database.find({ userId: userId }).fetch();
        return activities;
    }
    getLastAttendance(userId) {
        return this.database.find({ userId: userId }, { sort: { created_at: -1 }, limit: 2 }).fetch();
    }
}

export default attendance;