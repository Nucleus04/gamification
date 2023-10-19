import React, { Component } from "react";
import "../../stylesheet/PointSystem.css";
import { withTracker } from "meteor/react-meteor-data";
import GoalsWatcher from "../../../api/classes/client/GoalsWatcher/GoalsWatcher";
import { ADMIN, PUBLICATION, SESSION_KEYS } from "../../../api/common";

const name = "goals";
class PointSystem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            hour: 0,
            point: 0,
            profile: "",
        }
        GoalsWatcher.setWatcher(this, name);
    }
    updatePoints(event) {
        event.preventDefault();
        let doc = {
            hour: this.state.hour,
            point: this.state.point,
        }
        GoalsWatcher.updatePoints(doc);
    }
    zeroCHange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }
    componentDidMount() {
        let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
        this.setState({
            profile: profile[0],
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.points !== this.props.points) {
            this.setState({
                point: this.props.points && this.props.points.length > 0 ? this.props.points[0].point : 0,
                hour: this.props.points && this.props.points.length > 0 ? this.props.points[0].hour : 0,
            })
        }
    }
    render() {
        return (
            <div className="card_dashboard _w-100" style={{ boxSizing: "border-box" }}>
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2"
                        method="get" aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="div-block-395">
                                <div className="card_dashboard-label">Point system</div>
                            </div>
                        </div>
                        <div className="ry_cardcontent-style1">
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <p className="ry_p-style1 mb-0 text-darkblue">Duration-Hours</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">Points</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<p className="ry_p-style1 mb-0"><input type="number" name="hour" className="points-input" value={this.state.hour} onChange={this.zeroCHange.bind(this)} /></p>) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.hour}</p>)
                                    }
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<input type="number" className="points-input" name="point" value={this.state.point} onChange={this.zeroCHange.bind(this)} />) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.point}</p>)
                                    }
                                </div>
                            </div>
                            <br />
                            <p>Task complexity is based on how long can you finish a task. If you finish a <b>{this.state.hour}</b> hours task, you will earn <b>{this.state.point}</b> points.</p>

                        </div>
                        {
                            this.state.profile && this.state.profile.team === ADMIN ?
                                (<button className="update-points" onClick={this.updatePoints.bind(this)}>Update</button>) :
                                ""
                        }
                    </form>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    GoalsWatcher.initiateWatch(name);
    GoalsWatcher.subscribe(PUBLICATION.POINTSYSTEM);
    return {
        points: GoalsWatcher.Points.length > 0 ? GoalsWatcher.Points : "",
    }
})(PointSystem);