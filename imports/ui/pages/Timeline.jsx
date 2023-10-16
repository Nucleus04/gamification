import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import TopCardReport from "../components/timesheets/TopCardReport";
import TimelineRow from "../components/timeline/TimelineRow";
import TimelineTable from "../components/timeline/TimelineTable";
import TimelineWatcher from "../../api/classes/client/TimelineWatcher/TimelineWatcher";
import XLSX from 'xlsx';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            today: "",
            showDate: false,
            date: null,
        }
    }
    handleChange(event) {
        this.setState({
            today: new Date(event.target.value).toDateString(),
            showDate: false,
            date: event.target.value,
        })
        TimelineWatcher.setDate(event.target.value);

    }
    handleShowDate() {
        this.setState({
            showDate: !this.state.showDate,
        })
    }
    componentDidMount() {
        this.setState({
            today: new Date().toDateString()
        })
    }
    handleExport() {
        const data = [
            ['Name', 'Project', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Total'],
        ];
        const history = TimelineWatcher.History;
        const users = TimelineWatcher.TimelineCollection.find({}).fetch();

        for (let i = 0; i < users.length; i++) {
            let temp = [];
            temp.push(users[i].firstname + " " + users[i].lastname);
            temp.push(users[i].project);
            temp.push(`${history[i].mon.hour}: ${history[i].mon.min}`)
            temp.push(`${history[i].tue.hour}: ${history[i].tue.min}`)
            temp.push(`${history[i].wed.hour}: ${history[i].wed.min}`)
            temp.push(`${history[i].thu.hour}: ${history[i].thu.min}`)
            temp.push(`${history[i].fri.hour}: ${history[i].fri.min}`)
            temp.push(`${Math.floor(history[i].total / 60)}: ${Math.floor(history[i].total % 60)}`)
            data.push(temp);

        }
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported-data.xlsx');

    }
    render() {
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
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Timeline</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Timeline</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <TopCardReport />
                                        <div className="ry_bodycontainer flex-vertical">
                                            <div className="ry_bodytop">
                                                <div className="ry_bodytop_left">
                                                    <h1 className="ry_h2-display1">{this.state.today}</h1>
                                                    {/* <div className="ry_arrowdown"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg"
                                                        loading="lazy" alt="" /></div> */}

                                                </div>
                                                <div className="ry_bodytop_right"><a href="#"
                                                    className="ry_icon-btn-style1 light mr-10 w-inline-block" onClick={this.handleShowDate.bind(this)}>
                                                    <img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Filter</div>
                                                    <input className={`privacy-box-date2 ${this.state.showDate ? "" : "display-none"}`} type="date" onChange={this.handleChange.bind(this)} />
                                                    {/* <div className={`filter-modal `}>
                                                        <div>
                                                            <div className="filter-item" >
                                                                All
                                                            </div>
                                                            <div className="filter-item" >
                                                                released
                                                            </div>
                                                            <div className="filter-item" >
                                                                pending
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </a><a href="#" className="ry_icon-btn-style1 outline mr-10 w-inline-block" onClick={this.handleExport.bind(this)}><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                        <div>Export</div>
                                                    </a><a href="#" className="ry_icon-btn-style1 light square w-inline-block"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset mr-0" /></a></div>
                                            </div>
                                            <div className="ry_bodycontainer">
                                                <TimelineTable date={this.state.date} />
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


export default Timeline;