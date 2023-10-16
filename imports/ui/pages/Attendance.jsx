import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import AttendanceTable from "../components/attendance/AttendanceTable";
import TopCardReport from "../components/timesheets/TopCardReport";
import AttendanceWatcher from "../../api/classes/client/AttendanceWatcher/AttendanceWatcher";
import XLSX from "xlsx";
import { ADMIN, ATTENDANCE, PUBLICATION, SESSION_KEYS } from "../../api/common";
import { withTracker } from "meteor/react-meteor-data";

const name = "attendance";
class Attendance extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        AttendanceWatcher.setWatcher(this, name);
        this.state = {
            today: "",
            showDate: false,
            date: null,
            showfilters: false,
            filter: null,
            points: 0,
            profile: null,
        }
    }

    async requestToApi(access_token, date) {
        let date_end = new Date(date);
        let date_start = new Date(date);
        await AttendanceWatcher.requestActivityToApi(access_token, date_start, date_end);
    }

    async getActivities(access_token, date) {
        let date_end = new Date(date);
        let date_start = new Date(date);
        await AttendanceWatcher.retrieveAttendance(date_start, date_end);
        await this.requestToApi(access_token, date);
    }

    async handleChange(event) {
        let date = new Date(event.target.value);
        this.setState({
            today: new Date(event.target.value).toDateString(),
            showDate: false,
        });
        let token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        await this.getActivities(token, date);
    }

    handleShowDate() {
        this.setState({
            showDate: !this.state.showDate,
        });
    }

    handleShowFilter() {
        this.setState({
            showfilters: !this.state.showfilters,
        });
    }

    closeDate() {
        this.setState({
            showDate: false,
        })
    }

    async componentDidMount() {
        this.setState({
            today: new Date().toDateString()
        });
        this.setState({
            points: this.props.point.length > 0 ? this.props.point[0].points : 0,
        })
        let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
        this.setState({
            profile: profile[0],
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.point !== this.props.point) {
            this.setState({
                points: this.props.point.length > 0 ? this.props.point[0].points : 0,
            })
        }
    }
    handleFilter(filter) {
        this.setState({
            filter: filter,
        })
    }

    handleExport() {
        const data = [
            ['Name', 'Date', 'Status', 'StartTime', 'StopTime', 'Duration', 'Activity'],
        ];
        const attendance = AttendanceWatcher.Attendance;
        const users = AttendanceWatcher.Names;
        for (let i = 0; i < users.length; i++) {
            let total = {
                hour: 0,
                min: 0,
            }
            if (attendance[i].status != "Absent") {
                const startTimeParts = attendance[i].startTime.split(':');
                const endTimeParts = attendance[i].endTime.split(':');

                const startMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
                const endMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);

                const officeMinutes = endMinutes - startMinutes;
                total = {
                    hour: Math.floor(officeMinutes / 60),
                    min: officeMinutes % 60,
                }
            }
            let temp = [];
            temp.push(users[i][0].firstname + " " + users[i][0].lastname);
            temp.push(new Date(attendance[i].date).toDateString());
            temp.push(`${attendance[i].status}`)
            temp.push(attendance[i].startTime ? attendance[i].startTime : 0)
            temp.push(attendance[i].endTime ? attendance[i].endTime : 0)
            temp.push(`${total.hour}: ${total.min}`)
            temp.push(`${attendance[i].activity.length > 0 ? attendance[i].activity[0].percentage : "0%"}`);
            data.push(temp);

        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported-data.xlsx');
    }

    handleChangePoints(event) {
        this.setState({
            points: event.target.value
        })
        //AttendanceWatcher.changePointsEquivalent(event.target.value);
    }

    async onUpdatePoints(event) {
        event.preventDefault();
        await AttendanceWatcher.changePointsEquivalent(this.state.points);
        alert("Points updated successfully!");
    }
    render() {
        return (

            <div>
                <div className="ry_app-main-wrapper-style2">
                    <div data-w-id="ac3afbcf-65d0-1e1e-7bef-fe7812f0d460" className="icon_main-menu"><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg"
                        loading="lazy" alt="" />
                    </div>
                    <Header />
                    <div className="ry_main-section-style1">
                        <Menu reports={true} />
                        <div className="ry_main-style1">
                            <div className="ry_main-style1_container">
                                <div className="section-style1 mt-0">
                                    <div className="ry_dashboard_top mb-10">
                                        <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Reports</a>
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Attendance</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Attendance</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <TopCardReport />
                                        <div className="ry_bodycontainer flex-vertical">
                                            <div className="ry_bodytop">
                                                <div className="ry_bodytop_left">
                                                    <h1 className="ry_h2-display1" onClick={this.handleShowDate.bind(this)}>{this.state.today}</h1>
                                                    <div className="ry_arrowdown" onClick={this.handleShowDate.bind(this)}><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg"
                                                        loading="lazy" alt="" />  <input className={`privacy-box-date ${this.state.showDate ? "" : "display-none"}`} type="date" onChange={this.handleChange.bind(this)} /></div>

                                                </div>
                                                <div className="ry_bodytop_right">
                                                    <div href="#" className="ry_icon-btn-style1 light mr-10 w-inline-block">
                                                        <form onSubmit={this.onUpdatePoints.bind(this)}>Points to be earned : {this.state.profile && this.state.profile.team === ADMIN ?
                                                            (<div style={{ display: "flex" }}><input type="number" value={this.state.points} min={3} onChange={this.handleChangePoints.bind(this)} style={{ width: "40px" }} />  <button className="ry_icon-btn-style1 w-inline-block" style={{ marginTop: "10px", marginLeft: "10px" }} type="submit" >Update</button></div>)
                                                            : (<b style={{ color: "black" }}>{this.props.point.length > 0 && this.props.point[0].points}</b>)}
                                                        </form>
                                                    </div>

                                                    {/* <button href="#" onClick={this.handleShowFilter.bind(this)}
                                                        className="ry_icon-btn-style1 light mr-10 w-inline-block"><img
                                                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                                            loading="lazy" alt="" className="icon-btn_asset" />
                                                        <div>Filter</div>
                                                        <div className={`filter-modal ${this.state.showfilters ? "" : "display-none"}`}>
                                                            <div>
                                                                <div className="filter-item" onClick={() => this.handleFilter(null)}>
                                                                    All
                                                                </div>
                                                                <div className="filter-item" onClick={() => this.handleFilter("Present")}>
                                                                    Present
                                                                </div>
                                                                <div className="filter-item" onClick={() => this.handleFilter("Absent")}>
                                                                    Absent
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button> */}

                                                    <a href="#" className="ry_icon-btn-style1 outline mr-10 w-inline-block" onClick={this.handleExport.bind(this)}><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset" />
                                                        <div>Export</div>
                                                    </a>
                                                    <a href="#" className="ry_icon-btn-style1 light square w-inline-block"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset mr-0" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="ry_bodycontainer">
                                                <AttendanceTable filter={this.state.filter} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    AttendanceWatcher.initiateWatch(name);
    AttendanceWatcher.subscribe(PUBLICATION.ATTENDANCE_POINT_RETRIEVAL);
    return {
        point: AttendanceWatcher.Point,
    }
})(Attendance);