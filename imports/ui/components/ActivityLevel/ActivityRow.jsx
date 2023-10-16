import React, { Component } from "react";
import ActivityWatcher from "../../../api/classes/client/ActivityWatcher/ActivityWatcher";

class ActivityRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activities: null,
        }
    }
    async retrieveAverageActivity() {
        let result = await ActivityWatcher.retrieveActivities(this.props.details.userId);
        this.setState({
            activities: result
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
                            <div className={`ry_person-style2 profile-text ${this.props.details.firstname.charAt(0)}`}>{this.props.details.firstname.charAt(0)}</div>
                            <div className="table-text">
                                <div>{this.props.details.firstname + " " + this.props.details.lastname}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details.project}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.state.activities ? `${this.state.activities.mon} %` : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.state.activities ? `${this.state.activities.tue} %` : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.state.activities ? `${this.state.activities.wed} %` : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-yellow">
                            <div>{this.state.activities ? `${this.state.activities.thu} %` : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-yellow">
                            <div>{this.state.activities ? `${this.state.activities.fri} %` : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.state.activities && this.state.activities.total ? `${this.state.activities.total} %` : "0 %"}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ActivityRow;