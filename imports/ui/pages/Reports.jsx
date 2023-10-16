import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import TopSummary from "../components/rerports/TopSummary";



class Reports extends Component {
    constructor(props) {
        super(props);
        this.props = props;
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
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Overview</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Reports</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <TopSummary />
                                        <div className="ry_bodycontainer">
                                            <div className="card_row_container align-start">
                                                <div className="card_dashboard">
                                                    <div className="w-form">
                                                        <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                                                            aria-label="Email Form 2">
                                                            <div className="ry_cardtop">
                                                                <div className="card_dashboard-label">Reports</div>
                                                            </div>
                                                            <div className="ry_cardcontent-style1"><a href="/timesheets"
                                                                className="ry_linkblock-style1 w-inline-block">
                                                                <div>Time Sheet</div>
                                                            </a><a href="/timeline" className="ry_linkblock-style1 w-inline-block">
                                                                    <div>Timeline</div>
                                                                </a><a href="/attendance" className="ry_linkblock-style1 w-inline-block">
                                                                    <div>Attendance</div>
                                                                </a><a href="/activity-level" className="ry_linkblock-style1 w-inline-block">
                                                                    <div>Activity Level</div>
                                                                </a><a href="/360-feedback" className="ry_linkblock-style1 w-inline-block">
                                                                    <div>360^ Feedback</div>
                                                                </a></div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="div-block-399">

                                                </div>
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

export default Reports;