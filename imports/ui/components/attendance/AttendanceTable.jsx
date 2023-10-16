import React, { Component } from "react";
import AttendanceRow from "./AttendanceRow";
import AttendanceWatcher from "../../../api/classes/client/AttendanceWatcher/AttendanceWatcher";
import { withTracker } from "meteor/react-meteor-data";
import { SESSION_KEYS } from "../../../api/common";
import AttendanceRowSkeleton from "../common/AttendanceRowSkeleton";

const NAME = "attendance"
class AttendanceTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        AttendanceWatcher.setWatcher(this, NAME);
        this.state = {
            isLoading: false,
        }
    }
    retrieveAttendance() {
        AttendanceWatcher.retrieveAttendance();
    }

    getPreviousSunday(currentDate) {
        const dayOfWeek = currentDate.getDay();
        const daysUntilSunday = (dayOfWeek + 7 - 1) % 7;
        const previousSunday = new Date(currentDate);
        previousSunday.setDate(currentDate.getDate() - daysUntilSunday);

        return previousSunday;
    }

    async requestToApi(access_token) {
        let date_end = new Date();
        let date_start = new Date();
        await AttendanceWatcher.requestActivityToApi(access_token, date_start, date_end);
    }

    async getActivities(access_token) {
        let date_end = new Date();
        let date_start = new Date();
        await AttendanceWatcher.retrieveAttendance(date_start, date_end);
        this.setState({
            isLoading: false,
        })
        await this.requestToApi(access_token);
    }

    async componentDidMount() {
        let token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        this.setState({
            isLoading: true,
        })
        await this.getActivities(token);
    }
    render() {

        return (
            <div className="ry_tablecontainer">
                <div className="card_table">
                    <div className="rb-table students">
                        <div className="rb-table-hd">
                            <div className="rb-table-col stretch">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Name</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _15">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Date</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _15">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Status</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _15">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Start Time</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _15">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Stop Time</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Duration</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Activity</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rb-table-content">
                            {
                                this.state.isLoading ? <AttendanceRowSkeleton /> : this.props.attendance.map((item) => {
                                    return (
                                        <AttendanceRow key={item._id} details={item} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    AttendanceWatcher.initiateWatch(NAME);
    return {
        attendance: AttendanceWatcher.Attendance,
    }
})(AttendanceTable)