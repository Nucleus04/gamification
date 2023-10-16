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
            zero: this.props.points && this.props.points.length > 0 ? this.props.points[0].zero : 0,
            one: this.props.points && this.props.points.length > 0 ? this.props.points[0].one : 0,
            two: this.props.points && this.props.points.length > 0 ? this.props.points[0].two : 0,
            three: this.props.points && this.props.points.length > 0 ? this.props.points[0].three : 0,
            morethanthree: this.props.points && this.props.points.length > 0 ? this.props.points[0].morethanthree : 0,
            profile: "",
        }
        GoalsWatcher.setWatcher(this, name);
    }
    updatePoints(event) {
        event.preventDefault();
        let doc = {
            zero: this.state.zero,
            one: this.state.one,
            two: this.state.two,
            three: this.state.three,
            morethanthree: this.state.morethanthree,
        }
        GoalsWatcher.updatePoints(doc);
    }
    zeroCHange(event) {
        this.setState({
            zero: event.target.value,
        })
    }
    oneCHange(event) {
        this.setState({
            one: event.target.value,
        })
    }
    twoCHange(event) {
        this.setState({
            two: event.target.value,
        })
    }
    threeCHange(event) {
        this.setState({
            three: event.target.value,
        })
    }
    morethanthreeCHange(event) {
        this.setState({
            morethanthree: event.target.value,
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
                zero: this.props.points && this.props.points.length > 0 ? this.props.points[0].zero : 0,
                one: this.props.points && this.props.points.length > 0 ? this.props.points[0].one : 0,
                two: this.props.points && this.props.points.length > 0 ? this.props.points[0].two : 0,
                three: this.props.points && this.props.points.length > 0 ? this.props.points[0].three : 0,
                morethanthree: this.props.points && this.props.points.length > 0 ? this.props.points[0].morethanthree : 0,
            })
        }
    }
    render() {
        return (
            <div className="card_dashboard _w-100">
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
                                    <p className="ry_p-style1 mb-0 text-darkblue">Duration - Days</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">Point</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <p className="ry_p-style1 mb-0">0</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<input type="number" className="points-input" value={this.state.zero} onChange={this.zeroCHange.bind(this)} />) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.zero}</p>)
                                    }
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <p className="ry_p-style1 mb-0">1</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<input type="number" className="points-input" value={this.state.one} onChange={this.oneCHange.bind(this)} />) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.one}</p>)
                                    }
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <p className="ry_p-style1 mb-0">2</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<input type="number" className="points-input" value={this.state.two} onChange={this.twoCHange.bind(this)} />) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.two}</p>)
                                    }
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <p className="ry_p-style1 mb-0">3</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<input type="number" className="points-input" value={this.state.three} onChange={this.threeCHange.bind(this)} />) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.three}</p>)
                                    }
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <p className="ry_p-style1 mb-0">Morethan 3</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    {
                                        this.state.profile && this.state.profile.team === ADMIN ?
                                            (<input type="number" className="points-input" value={this.state.morethanthree} onChange={this.morethanthreeCHange.bind(this)} />) :
                                            (<p className="ry_p-style1 mb-0 text-darkblue">{this.state.morethanthree}</p>)
                                    }
                                </div>
                            </div>

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