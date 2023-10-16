import { Meteor } from "meteor/meteor";
import { CREATE_PROFILE, GET_API_CREDENTIALS, HUBSTAFF } from "../../common";
import api from "../../classes/server/services/api";
import { profileCollection } from "../../db";
import { DateTime } from "luxon";

class HubstaffMethods {
    method() {
        return Meteor.methods({
            [GET_API_CREDENTIALS]: function () {
                let client_id = api.Client_id;
                let redirect_uri = api.Redirect_Uri;
                let authorization_endpoint = api.Authorization_Endpoint;
                return {
                    client_id, redirect_uri, authorization_endpoint
                }
            },
            [HUBSTAFF.GET_ACCESS_TOKEN]: function (authorization_code) {

                try {
                    return api.getAccessToken(authorization_code)
                } catch (error) {
                    console.log(error);
                }
            },
            [HUBSTAFF.REFRESH_ACCESS_TOKEN]: function (refresh_token) {
                try {
                    return api.refreshAccessToken(refresh_token);
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [CREATE_PROFILE]: function ({ id, firstname, lastname, role }) {
                console.log("creating profile for user")
                try {
                    const now = DateTime.fromJSDate(new Date);
                    const timezone = now.zoneName;

                    return profileCollection.insert({
                        userId: id,
                        firstname: firstname,
                        lastname: lastname,
                        team: role,
                        hiredate: new Date(),
                        project: "none",
                        salary_rate_per_hour: 0,
                        timezone: timezone,
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
}


export default new HubstaffMethods;