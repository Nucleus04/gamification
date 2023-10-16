import React, { Component } from "react";
import TimelineWatcher from "../../../api/classes/client/TimelineWatcher/TimelineWatcher";
class TimelineRow extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            data: null,
        }
    }
    async retrieveTimeline() {

        let result = await TimelineWatcher.retrieveTimeline(this.props.details.userId);
        this.setState({
            data: result,
        })

    }
    componentDidMount() {
        this.retrieveTimeline();
    }
    componentDidUpdate(prevProps) {
        // Check if the prop value has changed
        if (this.props.date !== prevProps.date) {
            this.retrieveTimeline();

        }
    }

    render() {
        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="div-block-398">
                            <div className={`ry_person-style2 profile-text ${this.props.details ? this.props.details.firstname.charAt(0) : ""}`}>{this.props.details ? this.props.details.firstname.charAt(0) : ""}</div>
                            <div className="table-text">
                                <div>{this.props.details ? this.props.details.firstname + " " + this.props.details.lastname : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details ? this.props.details.project : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.data ? this.state.data.mon.hour + ":" : ""}{this.state.data ? this.state.data.mon.min : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.data ? this.state.data.tue.hour + ":" : ""}{this.state.data ? this.state.data.tue.min : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.data ? this.state.data.wed.hour + ":" : ""}{this.state.data ? this.state.data.wed.min : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.data ? this.state.data.thu.hour + ":" : ""}{this.state.data ? this.state.data.thu.min : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.data ? this.state.data.fri.hour + ":" : ""}{this.state.data ? this.state.data.fri.min : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.data ? Math.floor(this.state.data.total / 60) + ":" + this.state.data.total % 60 : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default TimelineRow;