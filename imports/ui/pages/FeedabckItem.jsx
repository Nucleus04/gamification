import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import AppFeedbackWatcher from "../../api/classes/client/AppFeedbackWatcher/AppFeedbackWatcher";
import "../stylesheet/Feedback.css";

class FeedbackItem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        AppFeedbackWatcher.setWatcher(this, "feedback");
    }

    async componentDidMount() {
        await AppFeedbackWatcher.retrieveFeedabck();
    }
    render() {
        AppFeedbackWatcher.initiateWatch("feedback");
        return (
            <div className="ry_app-main-wrapper-style2">
                <div data-w-id="ac3afbcf-65d0-1e1e-7bef-fe7812f0d460" className="icon_main-menu"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg"
                    loading="lazy" alt="" /></div>
                <Header />
                <div className="ry_main-section-style1">
                    <Menu />
                    <div className="ry_main-style1">
                        <div className="ry_main-style1_container">
                            <div className="section-style1 mt-0">
                                <div className="ry_dashboard_top mb-10">
                                    <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Feedback List</a>
                                        <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Overview</a>
                                    </div>
                                    <div className="ry_headercontainer">
                                        <h1 className="ry_h1-display1 text-white">Feedback List</h1>
                                    </div>
                                </div>
                                <div className="ry_body pb-0" style={{ display: "flex", height: "90%", justifyContent: "center" }}>
                                    <div className="item-feedabck-app-container">
                                        <div className="feedabck-item-main-container">
                                            {
                                                AppFeedbackWatcher.Feedback.map((element) => {
                                                    return (

                                                        <div className="app-feedback-item" key={element._id}>
                                                            <p><b>Reviewer :</b> {element.reviewer}</p>
                                                            <p>{new Date(element.created_at).toDateString()}</p>
                                                            <p><b>Report any bugs that are not working properly (optional):</b> {element.bugs}</p>
                                                            <p><b>Report anything that is important and should be there but not there (optional):</b> {element.missing}</p>
                                                            <p><b>Report things that you would like them to be there (optional):</b> {element.need_to_add}</p>
                                                            <p><b>Report anything that is there but should not be there (optional):</b> {element.need_to_remove}</p>
                                                            <img src={`${element.file ? element.file : ""}`} alt="" />
                                                        </div>

                                                    )
                                                })
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


export default FeedbackItem;