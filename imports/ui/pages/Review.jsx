import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import ReviewItem from "../components/review/ReviewItem";
import ReviewProfile from "../components/review/ReviewProfile";
import ReviewSummary from "../components/review/ReviewSummary";
import ReviewWatcher from "../../api/classes/client/ReviewWatcher/ReviewWatcher";
import "../stylesheet/ReviewItem.css";
//import AuthenticationWatcher from "../../api/classes/client/Authentication/AuthenticationWatcher";

import { withTracker } from "meteor/react-meteor-data";
import ReviewAddFilterButton from "../components/review/ReviewAddFilterButton";
import ReviewAddModal from "../components/review/ReviewAddModal";
const watcherKey = "Reviews"

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                name: "",
                team: "",
            },
            privacy: "Everyone",
            showPrivacySelector: false,
            reviews: [],
            showAddModal: false,
            needToUpdate: false,
        }
        ReviewWatcher.setWatcher(this, watcherKey);
    }

    async retrieveReviews() {
        try {
            await ReviewWatcher.retrieveReviews();
        } catch (error) {

        }
    }

    handleShowmore() {
        ReviewWatcher.retrieveReviews();
    }

    componentDidMount() {
        this.retrieveReviews();
        this.setState({
            reviews: this.props.reviews,
        })
    }

    handleChangePrivacy() {
        if (this.state.privacy === "Everyone") {
            this.setState({
                showPrivacySelector: false,
                privacy: "Me"
            })
            ReviewWatcher.setPrivacy("me")
            this.retrieveReviews();
        } else {
            this.setState({
                showPrivacySelector: false,
                privacy: "Everyone"
            })
            ReviewWatcher.setPrivacy("everyone")
            this.retrieveReviews();
        }
    }

    handleEveryone() {
        this.setState({
            showPrivacySelector: !this.state.showPrivacySelector,
        })
    }


    handleShowModal() {
        this.setState({
            showAddModal: !this.state.showAddModal,
        })
    }
    closeModal(state) {
        this.setState({
            showAddModal: state,
            needToUpdate: !this.state.needToUpdate,
        })
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
                        <Menu />
                        <div className="ry_main-style1">
                            <div className="ry_main-style1_container">
                                <div className="section-style1 mt-0">
                                    <div className="ry_dashboard_top mb-10">
                                        <div className="ry_breadcrumbs_container mb-0"><a href="#"
                                            className="ry_breadcrumbs-style1">Dashboard</a>
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#"
                                                className="ry_breadcrumbs-style1">Overview</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Review</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <div className="ry_bodytop">
                                            <div className="ry_bodytop_left">
                                                <h1 className="ry_h2-display1">About {this.state.privacy}</h1>
                                                <div className="ry_arrowdown" onClick={this.handleEveryone.bind(this)}><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg"
                                                    loading="lazy" alt="" /></div>
                                                <div className={`privacy-box ${this.state.showPrivacySelector ? "" : "display-none"}`} onClick={this.handleChangePrivacy.bind(this)}>{this.state.privacy === "Everyone" ? "Me" : "Everyone"}</div>
                                            </div>

                                            <div className="ry_bodytop_right">
                                                {/* <a href="#"
                                                className="ry_icon-btn-style1 light mr-10 w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                <div>Filter</div>
                                            </a> */}
                                                <button data-w-id="8232ce11-9743-edb8-96ba-6624a1340167" onClick={this.handleShowModal.bind(this)}
                                                    className="ry_icon-btn-style1 w-inline-block"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Add</div>
                                                </button></div>

                                        </div>
                                        <div className="ry_bodycontainer">
                                            <div className="ry_bodycontainer_left">
                                                {
                                                    this.props.reviews.map((reviewItem) => {
                                                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                                                        const formattedDate = new Date(reviewItem.date).toLocaleDateString('en-US', options);
                                                        return (
                                                            <div key={reviewItem._id}>
                                                                <ReviewItem details={reviewItem} date={formattedDate} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="show-more" onClick={this.handleShowmore.bind(this)}>Show More</div>
                                            </div>
                                            <div className="ry_bodycontainer_right">
                                                <ReviewProfile update={this.state.needToUpdate} />
                                                <ReviewSummary />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <ReviewAddModal showModal={this.state.showAddModal} closeModal={this.closeModal.bind(this)} />



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTracker(() => {
    ReviewWatcher.initiateWatch(watcherKey);
    return {
        reviews: ReviewWatcher.ReviewCollection,
    }
})(Review);