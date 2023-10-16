import React, { Component } from "react";
import ReportWatcher from "../../../api/classes/client/ReportWatcher/ReportWatcher";

class TopSummary extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            summary: null,
        }
    }
    async retrieveReportSummary() {
        let result = await ReportWatcher.summary();
        this.setState({
            summary: result,
        })
    }
    componentDidMount() {
        this.retrieveReportSummary();
    }
    render() {
        return (
            <div className="reports_top-card_container">
                <div className="card_dashboard_top _w-33">
                    <div className="card_dashboard_top-left justify-spacebetween">
                        <div className="div-block-382">
                            <div className="card_dashboard-label">Today</div>
                            <div className="ry_p-style1"><span className={`${this.state.summary && this.state.summary.percentageToday > 0 ? "span-green" : "span-red"}`}>{this.state.summary ? `${this.state.summary.percentageToday} %` : ""}</span> yesterday</div>
                        </div>
                        <h1 className="ry_h3-display1 weight-semibold">{this.state.summary ? this.state.summary.today : "0 : 0"}</h1>
                    </div>
                    <div className="card-dashboard_top-right horizontal">
                        <div className="ry_p-style1"><span className="span-darkblue">{this.state.summary ? `${this.state.summary.activeToday}` : ""}</span> Active members</div>
                        {/* <div className="ry_p-style1"><span className="span-darkblue">5</span> Active Projects</div> */}
                    </div>
                </div>
                <div className="card_dashboard_top _w-33">
                    <div className="card_dashboard_top-left justify-spacebetween">
                        <div className="div-block-382">
                            <div className="card_dashboard-label">Yesterday</div>
                            <div className="ry_p-style1"><span className={`${this.state.summary && this.state.summary.percentageYesterday > 0 ? "span-green" : "span-red"}`}>{this.state.summary ? `${this.state.summary.percentageYesterday} %` : ""}</span>week</div>
                        </div>
                        <h1 className="ry_h3-display1 weight-semibold">{this.state.summary ? this.state.summary.yesterday : "0 : 0"}</h1>
                    </div>
                    <div className="card-dashboard_top-right horizontal">
                        <div className="ry_p-style1"><span className="span-darkblue">{this.state.summary ? `${this.state.summary.activeYesterday}` : ""}</span> Active members</div>
                        {/* <div className="ry_p-style1"><span className="span-darkblue">5</span> Active Projects</div> */}
                    </div>
                </div>
                <div className="card_dashboard_top _w-33">
                    <div className="card_dashboard_top-left justify-spacebetween">
                        <div className="div-block-382">
                            <div className="card_dashboard-label">This Week</div>
                            {/* <div className="ry_p-style1"><span className="span-red">-75%</span> yesterday</div> */}
                        </div>
                        <h1 className="ry_h3-display1 weight-semibold">{this.state.summary ? this.state.summary.week : "0 : 0"}</h1>
                    </div>
                    <div className="card-dashboard_top-right horizontal">
                        <div className="ry_p-style1"><span className="span-darkblue">{this.state.summary ? `${this.state.summary.activeThisWeek}` : ""}</span> Active members</div>
                        {/* <div className="ry_p-style1"><span className="span-darkblue">5</span> Active Projects</div> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default TopSummary;