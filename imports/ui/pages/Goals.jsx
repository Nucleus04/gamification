import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import GoalsItem from "../components/goals/GoalsItem";
import GoalsSummary from "../components/goals/GoalsSummary";
import GoalsWatcher from "../../api/classes/client/GoalsWatcher/GoalsWatcher";
import { withTracker } from "meteor/react-meteor-data";
import AddGoalsComponent from "../components/goals/AddGoalsModal";
import { ADMIN, PUBLICATION, SESSION_KEYS } from "../../api/common";
import PointSystem from "../components/goals/PointSystem";
import DashboardWatcher from "../../api/classes/client/DashboardWatcher/DashboardWatcher";
import HubstaffWatcher from "../../api/classes/client/Authentication/HubstaffWatcher";
import AttendanceWatcher from "../../api/classes/client/AttendanceWatcher/AttendanceWatcher";
import { useNavigate } from "react-router-dom";



function Goals({ goals }) {
    const navigate = useNavigate();
    return (
        <GoalsComponent navigate={navigate} goals={goals} />
    )
}

class GoalsComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            showAddGoalModal: false,
            summary: null,
            profile: "",
            currentDataForGoalMOdal: null,
            point: 0,
        }

        this.onGoalPick = this.onGoalPick.bind(this);
    }

    async retrieveGoals() {
        let summary = await GoalsWatcher.retreiveGoals();
        this.setState({
            summary: summary,
        })
    }
    async getAuthorizationCode() {
        const currentUrl = window.location.search;
        const urlParams = new URLSearchParams(currentUrl);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            await HubstaffWatcher.getAccessToken(authorizationCode);
        } else {
            console.error('Authorization Code not found in the URL.');
            let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
            if (profile[0].team !== ADMIN) {
                alert("You do not authorize this application to hubstaff. You will be redirected to login page. Authorization is a must unless you are Administrator.");
                this.props.navigate("/");
            }
        }
    }
    getPreviousSunday(currentDate) {
        const dayOfWeek = currentDate.getDay();
        const daysUntilSunday = (dayOfWeek + 7 - 1) % 7;
        const previousSunday = new Date(currentDate);
        previousSunday.setDate(currentDate.getDate() - daysUntilSunday);

        return previousSunday;
    }
    async componentDidMount() {
        await DashboardWatcher.retrieveProfile()
        let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
        this.setState({
            profile: profile[0],
        });
        let access_token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        if (!access_token) {
            await this.getAuthorizationCode(access_token);
        }
        let token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        let date_end = new Date();
        let date_start = this.getPreviousSunday(new Date());
        await AttendanceWatcher.requestActivityToApi(token, date_start, date_end);

    }

    handleShowModal() {
        GoalsWatcher.addGoals();
        // this.setState({
        //     showAddGoalModal: true,
        // })
    }

    onGoalPick(data, point) {
        this.setState({
            showAddGoalModal: true,
            currentDataForGoalMOdal: data,
            point: point,
        })
    }
    closeModal() {
        this.setState({
            showAddGoalModal: false,
        })
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
                                <div className="ry_dashboard_top mb-10">
                                    <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Goals</a>
                                        <div className="ry_breadcrumbsdivider">/</div><a href="#"
                                            className="ry_breadcrumbs-style1">Overview</a>
                                    </div>
                                    <div className="ry_headercontainer">
                                        <h1 className="ry_h1-display1 text-white">Goals</h1>
                                    </div>
                                </div>
                                <div className="ry_body pb-0">
                                    <div className="ry_bodytop">
                                        <div className="ry_bodytop_left">
                                            <h1 className="ry_h2-display1">All Goals</h1>
                                        </div>
                                        {
                                            this.state.profile.team === ADMIN ? "" :
                                                (
                                                    <div className="ry_bodytop_right">
                                                        <a data-w-id="bfd1bb1a-b812-55c4-35f4-30b7f4515628" onClick={this.handleShowModal.bind(this)}
                                                            className="ry_icon-btn-style1 w-inline-block"><img
                                                                src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                                                loading="lazy" alt="" className="icon-btn_asset" />
                                                            <div>Add</div>
                                                        </a>
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className="ry_bodycontainer">
                                        <div className="ry_bodycontainer_left">
                                            {

                                                this.props.goals.length > 0 ? this.props.goals.map((item) => {
                                                    const dueDate = item.due_date ? new Date(item.due_date) : new Date();
                                                    const currentDate = new Date();
                                                    const timeDifferenceMs = dueDate - currentDate;
                                                    const timeDifferenceDays = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
                                                    return (

                                                        <div key={Math.random()}>
                                                            <GoalsItem details={item} timeDifference={timeDifferenceMs} dayBeforeEnd={timeDifferenceDays} onSelect={this.onGoalPick} />
                                                        </div>

                                                    )
                                                }) : <p style={{ textAlign: "center", fontSize: "16pt" }}>There is no current goals.</p>
                                            }


                                        </div>
                                        <div className="ry_bodycontainer_right">
                                            <GoalsSummary summary={this.state.summary} />
                                            <PointSystem />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AddGoalsComponent showModal={this.state.showAddGoalModal} data={this.state.currentDataForGoalMOdal} point={this.state.point} closeModal={this.closeModal.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));

    if (profile[0].team === ADMIN) {
        GoalsWatcher.subscribe(PUBLICATION.GOALS_ADMIN);
    } else {
        GoalsWatcher.subscribe(PUBLICATION.USERGOALS, profile[0].userId);
    }
    return {
        goals: GoalsWatcher.Goals,
    }
})(Goals);