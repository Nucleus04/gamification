import React, { Component } from "react";
import RadarChartFeedback from "./RadarChartFeedback";
import FeedbackWatcher from "../../../api/classes/client/FeedbackWatcher/FeedbackWatcher";
import { withTracker } from "meteor/react-meteor-data";
import { PUBLICATION, SESSION_KEYS } from "../../../api/common";

class FeedbackOverviewClient extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        FeedbackWatcher.setWatcher(this, "feedback");
        this.state = {
            isLoading: false,
        }
    }
    async componentDidMount() {
        this.setState({
            isLoading: true,
        })
        await FeedbackWatcher.retrieveFeedbacks();
        this.setState({
            isLoading: false,
        })
    }
    render() {
        return (
            <div className="ry_bodycontainer_left">

                <div className="ry_review flex-vertical">
                    <div className="ry_cardtop">
                        <div className="card_dashboard-label">Summary</div>
                    </div>
                    <p className="ry_p-style2">Average on all fields based on feedback this month</p>
                    <RadarChartFeedback feedbacks={FeedbackWatcher.feedbackNewAve} feedbacksOld={null} />
                </div>
                <div className="card_dashboard-label">Feedback history</div> <br />

                {
                    !this.state.isLoading ?

                        this.props.feedback.length > 0 ? this.props.feedback.map((feedback) => {
                            return (
                                <div className="ry_review flex-vertical" key={feedback._id}>
                                    <div className="ry_cardtop">
                                        <div className="card_dashboard-label">Reviewer : {feedback.reviewer}</div>
                                        <p className="ry_p-style2">Date: {new Date(feedback.created_at).toDateString()}</p>
                                    </div>
                                    <div className="ry_cardbody">
                                        <p className="ry_p-style1"><b>Communication</b> : {feedback.communication}</p>
                                    </div>
                                    <div className="ry_cardbody">
                                        <p className="ry_p-style1"><b>Teamwork</b> : {feedback.teamwork}</p>
                                    </div>
                                    <div className="ry_cardbody">
                                        <p className="ry_p-style1"><b>Accountability</b> : {feedback.accountability}</p>
                                    </div>
                                    <div className="ry_cardbody">
                                        <p className="ry_p-style1"><b>Integrity</b> : {feedback.integrity}</p>
                                    </div>
                                    <div className="ry_cardbody">
                                        <p className="ry_p-style1"><b>Notes</b> : {feedback.notes}</p>
                                    </div> <br />
                                    <div className="ry_cardtop">
                                        <div className="card_dashboard-label">Points Earned: <span><h3>{feedback.total_points} points </h3></span></div>
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="ry_review flex-vertical" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70px" }}>
                                <h3><b>There is no current feedback.</b></h3>
                            </div>
                        )

                        : (
                            <div className="ry_review flex-vertical">
                                <div className="ry_cardtop">
                                    <div className="card_dashboard-label skeleton">Reviewer : Reviewer Name</div>
                                    <p className="ry_p-style2 skeleton">Date: January 21, 2023</p>
                                </div>
                                <div className="ry_cardbody">
                                    <p className="ry_p-style1 skeleton"><b>Communication</b> : 10</p>
                                </div>
                                <div className="ry_cardbody">
                                    <p className="ry_p-style1 skeleton"><b>Teamwork</b> : 10</p>
                                </div>
                                <div className="ry_cardbody">
                                    <p className="ry_p-style1 skeleton"><b>Accountability</b> : 10</p>
                                </div>
                                <div className="ry_cardbody">
                                    <p className="ry_p-style1 skeleton"><b>Integrity</b> : 10</p>
                                </div>
                                <div className="ry_cardbody">
                                    <p className="ry_p-style1 skeleton"><b>Notes</b> : Nicess</p>
                                </div> <br />
                                <div className="ry_cardtop">
                                    <div className="card_dashboard-label skeleton">Points Earned: <span><h3>1000 points </h3></span></div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default withTracker(() => {
    FeedbackWatcher.initiateWatch("feedback");
    let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
    FeedbackWatcher.subscribe(PUBLICATION.FEEDBACK_LIST, profile[0].userId);
    return {
        feedback: FeedbackWatcher.FeedbackList,
    }

})(FeedbackOverviewClient);