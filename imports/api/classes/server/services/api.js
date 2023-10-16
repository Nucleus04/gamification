import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from "meteor/fetch";

class api {
    get Client_id() {
        return Meteor.settings.client_id;
    }
    get Redirect_Uri() {
        return Meteor.settings.redirect_uri;
    }
    get Authorization_Endpoint() {
        return Meteor.settings.authorization_endpoint;
    }
    get Token_Endpoint() {
        return Meteor.settings.token_endpoint;
    }
    get Client_Secret() {
        return Meteor.settings.client_secret;
    }
    /**
     * method that to retrieve access token using authorization code
     * @param {String} authorization_code 
     */
    async getAccessToken(authorization_code) {
        try {
            let url = `${this.Token_Endpoint}?grant_type=authorization_code&code=${authorization_code}&redirect_uri=${this.Redirect_Uri}`;
            let token_credential = await fetch(url, ({
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${this.Client_id}:${this.Client_Secret}`).toString("base64")}`
                })
            }));

            if (token_credential) {
                let result = await token_credential.json();
                return result;
            } else {
                console.log("There is something wrong in retrieving access_token");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * function that retrieve new access token
     * @param {string} refresh_token refresh token for getting new token
     * @returns {object} new access token
     */
    async refreshAccessToken(refresh_token) {
        try {
            let url = `${this.Token_Endpoint}?grant_type=refresh_token&refresh_token=${refresh_token}`;
            let token_credential = await fetch(url, ({
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${this.Client_id}:${this.Client_Secret}`).toString("base64")}`
                })
            }));

            if (token_credential) {
                let result = await token_credential.json();
                return result;
            } else {
                console.log("There is something wrong in retrieving access_token");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * retrieves organization where using belongs
     * @param {*} access_token 
     * @returns 
     */
    async getOrganization(access_token) {
        try {
            let url = `https://api.hubstaff.com/v2/organizations`;
            let result = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${access_token}`
                })
            })
            let organization = await result.json()
            return organization.organizations[0].id;
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * retrieve project information of the user
     * @param {String} access_token 
     * @param {String} organization_id 
     * @returns 
     */
    async getProject(access_token, organization_id) {
        try {
            let url = `https://api.hubstaff.com/v2/organizations/${organization_id}/projects`;
            let result = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${access_token}`
                })
            })
            let project = await result.json();
            return project.projects[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * function the retrieve activity on hubstaff api asynchronously
     * @param {String} access_token 
     * @param {Date} date_start 
     * @param {Date} date_end 
     * @param {String} userId 
     * @returns 
     */
    async getActivities(access_token, date_start, date_end, userId) {
        try {
            let organization_id = await this.getOrganization(access_token);
            let project = await this.getProject(access_token, organization_id);
            let url = `https://api.hubstaff.com/v2/projects/${project.id}/activities/daily?date[start]=${date_start}&date[stop]=${date_end}`;
            let result = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${access_token}`
                }),

            })
            let activities = await result.json();
            console.log("Activities from api", activities);
            activities.daily_activities.forEach(element => {
                element.projectName = project.name;
                element.userId = userId;
            });
            return activities.daily_activities;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new api;