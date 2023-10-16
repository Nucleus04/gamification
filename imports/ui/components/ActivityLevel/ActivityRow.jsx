import React, { Component } from "react";
import ActivityWatcher from "../../../api/classes/client/ActivityWatcher/ActivityWatcher";
import { ADMIN } from "../../../api/common";

class ActivityRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activities: null,
            isLoading: false
        }
    }
    async retrieveAverageActivity() {
        this.setState({
            isLoading: true,
        })
        let result = await ActivityWatcher.retrieveActivities(this.props.details.userId);
        this.setState({
            activities: result,
            isLoading: false,
        })
    }
    componentDidMount() {
        this.retrieveAverageActivity()
    }

    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date) {
            this.retrieveAverageActivity();
        }
    }

    render() {
        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="div-block-398">
                            <div className={`ry_person-style2 profile-text ${this.state.isLoading && "skeleton"} ${this.props.details.firstname.charAt(0)}`}>{this.props.details.firstname.charAt(0)}</div>
                            <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                                <div>{this.props.details.firstname + " " + this.props.details.lastname}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.props.details.team === ADMIN ? "Administrator" : this.props.details.team}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"} ${this.state.activities ? this.state.activities.mon >= 60 ? "text-green" : this.state.activities.mon >= 40 && this.state.activities.mon < 60 ? "text-yellow" : this.state.activities.mon < 40 && "text-red" : ""}`}>
                            <div>{this.state.activities ? `${this.state.activities.mon} %` : "oo:oo"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"} ${this.state.activities ? this.state.activities.tue >= 60 ? "text-green" : this.state.activities.tue >= 40 && this.state.activities.tue < 60 ? "text-yellow" : this.state.activities.tue < 40 && "text-red" : ""}`}>
                            <div>{this.state.activities ? `${this.state.activities.tue} %` : "oo:oo"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"} ${this.state.activities ? this.state.activities.wed >= 60 ? "text-green" : this.state.activities.wed >= 40 && this.state.activities.wed < 60 ? "text-yellow" : this.state.activities.wed < 40 && "text-red" : ""}`}>
                            <div>{this.state.activities ? `${this.state.activities.wed} %` : "oo:oo"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"} ${this.state.activities ? this.state.activities.thu >= 60 ? "text-green" : this.state.activities.thu >= 40 && this.state.activities.thu < 60 ? "text-yellow" : this.state.activities.thu < 40 && "text-red" : ""}`}>
                            <div>{this.state.activities ? `${this.state.activities.thu} %` : "oo:oo"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"} ${this.state.activities ? this.state.activities.fri >= 60 ? "text-green" : this.state.activities.fri >= 40 && this.state.activities.fri < 60 ? "text-yellow" : this.state.activities.fri < 40 && "text-red" : ""}`}>
                            <div>{this.state.activities ? `${this.state.activities.fri} %` : "oo:oo"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"} ${this.state.activities ? this.state.activities.total >= 60 ? "text-green" : this.state.activities.total >= 40 && this.state.activities.total < 60 ? "text-yellow" : this.state.activities.total < 40 && "text-red" : ""}`}>
                            <div>{this.state.activities && this.state.activities.total ? `${this.state.activities.total} %` : "00:00%"}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ActivityRow;