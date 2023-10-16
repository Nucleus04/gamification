import React, { Component } from "react";
import TimelineWatcher from "../../../api/classes/client/TimelineWatcher/TimelineWatcher";
import { ADMIN } from "../../../api/common";
class TimelineRow extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            data: null,
            isLoading: false,
        }
    }
    async retrieveTimeline() {
        this.setState({
            isLoading: true,
        })
        let result = await TimelineWatcher.retrieveTimeline(this.props.details.userId);
        this.setState({
            data: result,
            isLoading: false,
        })

    }
    componentDidMount() {
        this.retrieveTimeline();
    }
    componentDidUpdate(prevProps) {
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
                            <div className={`ry_person-style2 profile-text ${this.state.isLoading && "skeleton"} ${this.props.details ? this.props.details.firstname.charAt(0) : ""}`}>{this.props.details ? this.props.details.firstname.charAt(0) : ""}</div>
                            <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                                <div>{this.props.details ? this.props.details.firstname + " " + this.props.details.lastname : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.props.details ? this.props.details.team === ADMIN ? "Administrator" : this.props.details.team : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.state.data ? this.state.data.mon.hour + " h : " : ""}{this.state.data ? this.state.data.mon.min + " m" : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.state.data ? this.state.data.tue.hour + " h : " : ""}{this.state.data ? this.state.data.tue.min + " m" : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.state.data ? this.state.data.wed.hour + " h : " : ""}{this.state.data ? this.state.data.wed.min + " m" : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.state.data ? this.state.data.thu.hour + " h : " : ""}{this.state.data ? this.state.data.thu.min + " m" : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.state.data ? this.state.data.fri.hour + " h : " : ""}{this.state.data ? this.state.data.fri.min + " m" : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className={`table-text ${this.state.isLoading && "skeleton"}`}>
                            <div>{this.state.data ? this.state.data.total.hour + " h : " + this.state.data.total.minute + " m" : "--:--"}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default TimelineRow;