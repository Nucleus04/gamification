import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import TopDashboard from "../components/dashboard/TopDasboard";
import TOdaysActivity from "../components/dashboard/TodaysActivity";
import ProductivityCard from "../components/dashboard/Productivity";
import GoalsCard from "../components/dashboard/GoalsCard";
import AttendanceCard from "../components/dashboard/AttendanceCaard";
import TopMembersCard from "../components/dashboard/TopMembersCard";
import HubstaffWatcher from "../../api/classes/client/Authentication/HubstaffWatcher";
import { SESSION_KEYS } from "../../api/common";
import AttendanceWatcher from "../../api/classes/client/AttendanceWatcher/AttendanceWatcher";

function Dashboard() {
    return (
        <DashboardComponent />
    )
}
class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.props = props;
    }
    async getAuthorizationCode() {
        const currentUrl = window.location.search;
        const urlParams = new URLSearchParams(currentUrl);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            await HubstaffWatcher.getAccessToken(authorizationCode);
        } else {
            console.error('Authorization Code not found in the URL.');
        }
    }
    async checkExpiryDate(access_token) {
        let expires_in = localStorage.getItem(SESSION_KEYS.expires_in);
        let expriyDate = new Date(expires_in);
        let currentDate = new Date();

        if (currentDate.getTime() > expriyDate.getTime()) {
            return await HubstaffWatcher.refreshAccessToken(access_token.refresh_token);
        }
    }
    async componentDidMount() {
        let access_token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        if (!access_token) {
            await this.getAuthorizationCode(access_token);
        }
        this.checkExpiryDate(access_token);
        let date_end = new Date();
        let date_start = new Date();
        // let test = new Date();
        // localStorage.setItem(SESSION_KEYS.expires_in, test);
        AttendanceWatcher.requestActivityToApi(access_token, date_start, date_end);
    }
    render() {
        return (
            <div className="ry_app-main-wrapper-style2">
                <div data-w-id="ac3afbcf-65d0-1e1e-7bef-fe7812f0d460" className="icon_main-menu"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg"
                    loading="lazy" alt="" /></div>
                <Header />
                <div className="ry_main-section-style1">
                    <Menu />
                    <div className="ry_main-style1">
                        <div className="ry_main-style1_container">
                            <div className="section-style1 mt-0">
                                <TopDashboard />
                                <div className="ry_body">
                                    <div className="card_row_container">
                                        <TOdaysActivity />
                                        <ProductivityCard />
                                        <GoalsCard />
                                    </div>
                                    <div className="card_row_container">
                                        <AttendanceCard />
                                        <TopMembersCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Dashboard;