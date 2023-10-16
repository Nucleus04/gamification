import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import FeedbackWatcher from "../../api/classes/client/FeedbackWatcher/FeedbackWatcher";
import FeedbackSummary from "../components/Feedback/FeedbackSummary";
import { ADMIN, SESSION_KEYS } from "../../api/common";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import FeedbackOverviewClient from "../components/Feedback/FeedbackOverviewClient";
import FeedbackPoints from "../components/Feedback/FeedbackPoints";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,

);

class Feedbacks extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            presentFeedbackAverage: null,
            oldFeedbackAverage: null,
            feedback: null,
            summary: null,
            profile: null,
            today: new Date().toDateString(),
        }
    }
    async retrieveFeedbacks() {
        await FeedbackWatcher.retrieveFeedbacks();
        let result = FeedbackWatcher.feedbackNewAve;
        let resultOld = FeedbackWatcher.feedbackOldAve;
        let feedback = FeedbackWatcher.Feedback;
        let summary = FeedbackWatcher.getSummary;
        this.setState({
            presentFeedbackAverage: result,
            oldFeedbackAverage: resultOld,
            feedback: feedback,
            summary: summary,
        });
    }
    componentDidMount() {
        //this.retrieveFeedbacks()
        this.setState({
            profile: JSON.parse(localStorage.getItem(SESSION_KEYS.profile)),
        })
    }
    render() {
        return (
            <div >
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
                                        <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Dashboard</a>
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Overview</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">360° Feedback</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <div className="ry_bodytop">
                                            <div className="ry_bodytop_left">
                                                <h1 className="ry_h2-display1 mr-10">Results</h1>
                                                <p className="ry_p-style1 mb-0 text-darkblue text-semibold">as of {this.state.today}</p>
                                            </div>
                                            <div className="ry_bodytop_right">


                                                <FeedbackPoints />

                                                <a href="#" className="ry_icon-btn-style1 light mr-10 w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Filter</div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="ry_bodycontainer">

                                            {
                                                this.state.profile && this.state.profile[0].team === ADMIN ? (
                                                    <div className="ry_bodycontainer_left">
                                                        <div className="ry_review flex-vertical">
                                                            <div className="ry_cardtop">
                                                                <div className="card_dashboard-label">Give feedback</div>
                                                            </div>
                                                            <FeedbackForm />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <FeedbackOverviewClient />

                                                )
                                            }
                                            {
                                                this.state.profile && this.state.profile[0].team === ADMIN ? (
                                                    <div className="ry_bodycontainer_right">
                                                        <div className="card_dashboard _w-100">
                                                            <div className="card_dashboard_top-left">
                                                                <div className={`ry_person-style1 profile-text ${this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}`}>{this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}</div>
                                                                <div className="div-block-382">
                                                                    <h1 className="ry_h3-display1">{this.state.profile ? this.state.profile[0].firstname + " " + this.state.profile[0].lastname : ""}</h1>
                                                                    <div className="ry_p-style1">{this.state.profile ? this.state.profile[0].team === ADMIN ? "Administrator" : this.state.profile[0].team : ""}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="ry_bodycontainer_right">
                                                        <div className="card_dashboard _w-100">
                                                            <div className="card_dashboard_top-left">
                                                                <div className={`ry_person-style1 profile-text ${this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}`}>{this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}</div>
                                                                <div className="div-block-382">
                                                                    <h1 className="ry_h3-display1">{this.state.profile ? this.state.profile[0].firstname + " " + this.state.profile[0].lastname : ""}</h1>
                                                                    <div className="ry_p-style1">{this.state.profile ? this.state.profile[0].team === ADMIN ? "Administrator" : this.state.profile[0].team : ""}</div>
                                                                </div>
                                                            </div>
                                                            <FeedbackSummary summary={this.state.summary} profile={this.state.profile} />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default Feedbacks;