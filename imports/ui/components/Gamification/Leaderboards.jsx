import React, { Component } from "react";
import GamificationWatcher from "../../../api/classes/client/Gamification/GamificationWatcher";
import AttendanceWatcher from "../../../api/classes/client/AttendanceWatcher/AttendanceWatcher";
import LeaderboardsRow from "./LeaderboardsRow";
import { ADMIN, SESSION_KEYS } from "../../../api/common";
import { withTracker } from "meteor/react-meteor-data";


class Leaderboards extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            leaderboards: [],
            profile: null,
        }

    }
    async onReset() {
        if (window.confirm("Are you sure on reseting leaderboards?")) {
            await GamificationWatcher.resetPoints();
            let users = await GamificationWatcher.retrieveLeaderboards();
            this.setState({
                leaderboards: users,
            })
        }
    }
    async componentDidMount() {
        this.setState({
            profile: JSON.parse(localStorage.getItem(SESSION_KEYS.profile)),
        })
        let users = await GamificationWatcher.retrieveLeaderboards();
        this.setState({
            leaderboards: users,
        })
    }
    render() {
        return (
            <div className="card_dashboard _w-100">
                <div className="w-form">
                    <div id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="div-block-395">
                                <svg style={{ color: "violet", marginRight: "7px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bar-chart" viewBox="0 0 16 16"> <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" /> </svg>
                                <div className="card_dashboard-label" style={{ color: "violet", fontSize: "14pt" }}>Leaderboards
                                </div>
                            </div>
                        </div>

                        <div className="ry_cardcontent-style1">


                            {
                                this.props.leaderboards.map((item) => {
                                    return (
                                        <LeaderboardsRow item={item} key={item._id} />
                                    )
                                })
                            }



                            {
                                this.state.profile && this.state.profile[0].team === ADMIN ? <div>
                                    <br />
                                    <button className="ry_icon-btn-style1 w-inline-block" style={{ width: "100%" }} onClick={this.onReset.bind(this)}>Reset</button>
                                </div> : <div>
                                    <label htmlFor="credits" style={{ marginTop: "10px" }}>Required points for leaderboards : </label>
                                    <p className="ry_p-style1 mb-0">{this.state.leaderboards.length > 0 ? this.state.leaderboards[this.state.leaderboards.length - 1].highest_point : "0"}</p>
                                    <label htmlFor="credits" style={{ marginTop: "10px" }}>Your current points : </label>
                                    <p className="ry_p-style1 mb-0">{GamificationWatcher.PointsAndCredits(Meteor.userId()).length > 0 ? GamificationWatcher.PointsAndCredits(Meteor.userId())[0].highest_point : "0"}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}



export default withTracker(() => {
    GamificationWatcher.initiateWatch("gamification");
    return {
        leaderboards: GamificationWatcher.Leaderboards,
    }
})(Leaderboards);