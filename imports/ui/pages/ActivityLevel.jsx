import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import TopCardReport from "../components/timesheets/TopCardReport";
import ActivityTable from "../components/ActivityLevel/ActivityTable";
import ActivityWatcher from "../../api/classes/client/ActivityWatcher/ActivityWatcher";
import XLSX from 'xlsx';
import { ADMIN } from "../../api/common";

class ActivityLevel extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        ActivityWatcher.setWatcher(this, 'activity');
        this.state = {
            projects: ActivityWatcher.Projects,
            today: "",
            showDate: false,
            date: null,
            showfilters: false,
            filter: null,
            teams: [],
            date: null,
        }
    }
    handleShowFilter() {
        this.setState({
            showfilters: !this.state.showfilters,
        })
        this.setState({
            teams: ActivityWatcher.Projects,
        })
    }
    handleShowDate() {
        this.setState({
            showDate: !this.state.showDate,
        })
    }
    handleFilter(filter) {
        this.setState({
            filter: filter,
        })
    }
    async handleChange(event) {
        this.setState({
            today: new Date(event.target.value).toDateString(),
            showDate: false,
            date: event.target.value,
        })
        ActivityWatcher.setDate(event.target.value);
        ActivityWatcher.removeLastBasis();
        await ActivityWatcher.retrieveUsers();
        //await ActivityWatcher.retrieveActivities();

    }
    handleExport() {
        const data = [
            ['Name', 'Team', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Average'],
        ];
        const history = ActivityWatcher.History;
        const users = ActivityWatcher.ActivityUser;

        for (let i = 0; i < users.length; i++) {
            let temp = [];
            temp.push(users[i].firstname + " " + users[i].lastname);
            temp.push(users[i].team === ADMIN ? "Administrator" : users[i].team);
            temp.push(`${history[i].mon}`)
            temp.push(`${history[i].tue}`)
            temp.push(`${history[i].wed}`)
            temp.push(`${history[i].thu}`)
            temp.push(`${history[i].fri}`)
            temp.push(`${history[i].total}`)
            data.push(temp);

        }
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported-data.xlsx');

    }
    componentDidMount() {
        this.setState({
            today: new Date().toDateString()
        })
    }
    render() {
        ActivityWatcher.initiateWatch("activity");
        return (
            <div>
                <div className="ry_app-main-wrapper-style2">
                    <div data-w-id="ac3afbcf-65d0-1e1e-7bef-fe7812f0d460" className="icon_main-menu"><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg"
                        loading="lazy" alt="" /></div>
                    <Header />
                    <div className="ry_main-section-style1">
                        <Menu reports={true} />
                        <div className="ry_main-style1">
                            <div className="ry_main-style1_container">
                                <div className="section-style1 mt-0">
                                    <div className="ry_dashboard_top mb-10">
                                        <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Reports</a>
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Activity Level</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Activity Level</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">

                                        <TopCardReport />

                                        <div className="ry_bodycontainer flex-vertical">
                                            <div className="ry_bodytop">
                                                <div className="ry_bodytop_left">
                                                    <h1 className="ry_h2-display1">{this.state.today}</h1>
                                                    <div className="ry_arrowdown" onClick={this.handleShowDate.bind(this)}><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg"
                                                        loading="lazy" alt="" /><input className={`privacy-box-date ${this.state.showDate ? "" : "display-none"}`} type="date" onChange={this.handleChange.bind(this)} /></div>
                                                </div>
                                                <div className="ry_bodytop_right"><a href="#" onClick={this.handleShowFilter.bind(this)}
                                                    className="ry_icon-btn-style1 light mr-10 w-inline-block"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Filter</div>
                                                    <div className={`filter-modal ${this.state.showfilters ? "" : "display-none"}`}>
                                                        <div>
                                                            <div className="filter-item" onClick={() => this.handleFilter(null)}>
                                                                All
                                                            </div>
                                                            {
                                                                this.state.teams.map((item) => {
                                                                    return (
                                                                        <div className="filter-item" key={item} onClick={() => this.handleFilter(item)}>
                                                                            {item === ADMIN ? "Administrator" : item}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </a><a href="#" className="ry_icon-btn-style1 outline mr-10 w-inline-block" onClick={this.handleExport.bind(this)}><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                        <div>Export</div>
                                                    </a><a href="#" className="ry_icon-btn-style1 light square w-inline-block"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset mr-0" /></a></div>
                                            </div>
                                            <div className="ry_bodycontainer">
                                                <ActivityTable date={this.state.date} filter={this.state.filter} />
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

export default ActivityLevel;