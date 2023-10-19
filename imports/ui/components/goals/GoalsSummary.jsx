import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import GoalsWatcher from "../../../api/classes/client/GoalsWatcher/GoalsWatcher";
class GoalsSummary extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        GoalsWatcher.setWatcher(this, "goals");
        this.state = {
            unstarted: 0,
            completed: 0,
            ongoing: 0,
        }
    }
    count(goals) {
        let completed = 0, ongoing = 0, unstarted = 0;
        goals.forEach(element => {
            if (element.status === "completed") {
                completed = completed + 1;
            } else if (element.status === "unstarted") {
                unstarted = unstarted + 1;
            } else if (element.status === "ongoing") {
                ongoing = ongoing + 1;
            }
        });
        this.setState({
            unstarted: unstarted,
            ongoing: ongoing,
            completed: completed,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.goals !== this.props.goals) {
            if (this.props.goals.length > 0) {
                this.count(this.props.goals);
            }
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
                                <div className="card_dashboard-label">Goals Summary</div>
                            </div>
                        </div>
                        <div className="ry_cardcontent-style1">
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0 bg-skyblue"></div>
                                    <p className="ry_p-style1 mb-0">Unstarted</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.state.unstarted}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0 bg-yellow"></div>
                                    <p className="ry_p-style1 mb-0">Ongoing</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.state.ongoing}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0 bg-green"></div>
                                    <p className="ry_p-style1 mb-0">Completed</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.state.completed}</p>
                                </div>
                            </div>
                            {/* <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0 bg-red"></div>
                                    <p className="ry_p-style1 mb-0">Over due</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.props.summary ? this.props.summary.atrisk : ""}</p>
                                </div>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}



export default withTracker(() => {
    GoalsWatcher.initiateWatch("goals");
    return {
        goals: GoalsWatcher.Goals,
    }
})(GoalsSummary);