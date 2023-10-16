import React, { Component } from "react";
import { ADMIN, PUBLICATION, SESSION_KEYS } from "../../../api/common";
import FeedbackWatcher from "../../../api/classes/client/FeedbackWatcher/FeedbackWatcher";
import { withTracker } from "meteor/react-meteor-data";

let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));

class FeedbackPoints extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        FeedbackWatcher.setWatcher(this, "feedback");
        this.state = {
            profile: null,
        }
    }

    onPointChange(event) {
        this.setState({
            point: event.target.value,
        });
        FeedbackWatcher.changePointSystem(event.target.value);
    }
    componentDidMount() {
        this.setState({
            profile: profile,
        })

    }
    render() {
        return (
            <button href="#" className="ry_icon-btn-style1 light mr-10 w-inline-block" style={{ color: "black" }}>
                <div>Points per score :
                    {
                        this.state.profile && this.state.profile[0].team === ADMIN ? <input type="number" min={0} onChange={this.onPointChange.bind(this)} value={this.props.points.length > 0 ? Number(this.props.points[0].points) : 0} style={{ width: "40px" }} /> : this.props.points.length > 0 ? this.props.points[0].points : 0
                    }
                </div>
            </button>
        )
    }
}


export default withTracker(() => {

    FeedbackWatcher.initiateWatch("feedback");
    FeedbackWatcher.subscribe(PUBLICATION.FEEDBACK_POINTSYSTEM);
    return {
        points: FeedbackWatcher.PointSystem,
    }

})(FeedbackPoints);