import React, { Component } from "react";
import AttendanceWatcher from "../../../api/classes/client/AttendanceWatcher/AttendanceWatcher";

class AttendanceRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: '',
        }
    }
    async retrieveNames() {
        let result = await AttendanceWatcher.retrieveNames(this.props.details.userId);
        this.setState({
            name: result[0].firstname + " " + result[0].lastname,
        })
    }
    calculateAverageActivity(total_hour, total_active) {
        let total = total_active / total_hour * 100;
        return parseFloat(total).toFixed(2);
    }
    extractTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let formatedHour = 0;
        if (hours > 12) {
            formatedHour = hours % 12
        } else {
            formatedHour = hours;
        }
        const timeString = `${formatedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        return timeString;
    }
    secondsToHourMinute(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const paddedMinutes = String(minutes).padStart(2, '0');
        return `${hours}:${paddedMinutes}`;
    }
    componentDidMount() {
        this.retrieveNames();

    }
    render() {
        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="div-block-398">
                            <div className={`ry_person-style2 profile-text ${this.state.name.charAt(0)}`}>{this.state.name.charAt(0)}</div>
                            <div className="table-text">
                                <div>{this.state.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details ? new Date(this.props.details.created_at).toDateString() : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className={`ry_badge-style1 ${this.props.details && "Present" === "Absent" ? "bg-red" : ""}`}>{this.props.details ? "Present" : ""}</div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details && this.props.details.created_at ? this.extractTime(this.props.details.created_at) : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details && this.props.details.updated_at ? this.extractTime(this.props.details.updated_at) : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details.billable ? this.secondsToHourMinute(this.props.details.billable) : "--:--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.props.details ? this.calculateAverageActivity(this.props.details.billable, this.props.details.overall) : "0"}%</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default AttendanceRow;