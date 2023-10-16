import { Meteor } from "meteor/meteor";
import { profileCollection } from "../../db";
import { SETTINGS } from "../../common";

class SettingsMethod {
    method() {
        return Meteor.methods({
            [SETTINGS.UPDATEPROFILE]: function ({ firstname, lastname, timezone, id }) {
                console.log(firstname, lastname, timezone, id);
                return profileCollection.update({ userId: id }, { $set: { firstname, lastname, timezone } });
            }
        })
    }
}


export default new SettingsMethod;