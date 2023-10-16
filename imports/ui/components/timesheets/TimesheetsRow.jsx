import React, { Component } from "react";
import TimeSheetWatcher from "../../../api/classes/client/TimeSheetWatcher/TimeSheetWatcher";


class TimesheetsRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            user: null,
        }
    }
    async retrieveUserInfo() {
        let result = await TimeSheetWatcher.retrieveUserInfo(this.props.timesheet.userId);
        this.setState({
            user: result,
        })
    }
    componentDidMount() {
        this.retrieveUserInfo();
    }

    render() {

        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="div-block-398">
                            <div className={`ry_person-style2 profile-text ${this.state.user ? this.state.user[0].firstname.charAt(0) : ""}`}>{this.state.user ? this.state.user[0].firstname.charAt(0) : ""}</div>
                            <div className="table-text">
                                <div>{this.state.user ? this.state.user[0].firstname + " " + this.state.user[0].lastname : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.user ? this.state.user[0].team : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.timesheet.date}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _20">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.timesheet.numberOfHours ? `${this.props.timesheet.numberOfHours}:${this.props.timesheet.numberOfMinutes} h` : `Absent`}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.props.timesheet.productivityLevel ? parseFloat(this.props.timesheet.productivityLevel).toFixed(2) : "0"}%</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.user && this.props.timesheet.numberOfHours ? this.state.user[0].salary_rate_per_hour * this.props.timesheet.numberOfHours : "0"}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TimesheetsRow;