import React, { Component } from "react";
import ReviewWatcher from "../../../api/classes/client/ReviewWatcher/ReviewWatcher";
import { withTracker } from "meteor/react-meteor-data";
import { PUBLICATION } from "../../../api/common";
import ReviewProfile from "./ReviewProfile";

const name = "review";
class ReviewSummary extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        ReviewWatcher.setWatcher(this, name);
        this.state = {
            list: [],
            needToUpdate: false,
        }
    }
    // // async retreiveTopList() {
    // //     let list = await ReviewWatcher.retrieveTopReviewedEmployee();
    // //     this.setState({
    // //         list: list,
    // //     })
    // // }
    // componentDidMount() {
    //     //this.retreiveTopList();
    // }
    componentDidUpdate(prevProps) {
        if (prevProps.summary !== this.props.summary) {
            this.setState({
                needToUpdate: !this.state.needToUpdate,
            })
        }
    }
    render() {
        return (
            <div>
                <div className="card_dashboard _w-100">
                    <div className="w-form">
                        <form id="email-form-2" name="email-form-2" data-name="Email Form 2"
                            method="get" aria-label="Email Form 2">
                            <div className="ry_cardtop">
                                <div className="div-block-395">
                                    <div className="ry_iconsmall"><img
                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7e21c2387b8fe8c2bd_review_03.svg"
                                        loading="lazy" alt="" /></div>
                                    <div className="card_dashboard-label">Most Appreciated</div>
                                </div>
                            </div>
                            <div className="ry_cardcontent-style1">
                                {
                                    this.props.summary.map((item) => {

                                        return (
                                            <div className="ry_cardcontent_row" key={item._id}>
                                                <div className="ry_cardcontent_rowcol">
                                                    <div className={`ry_person-style2 profile-text ${item.name.charAt(0)}`}>{item.name.charAt(0)}</div>
                                                    <p className="ry_p-style1 mb-0">{item.name}</p>
                                                </div>
                                                <div className="ry_cardcontent_rowcol _w-10">
                                                    <p className="ry_p-style1 mb-0 text-darkblue">{item.recieved}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </form>
                        <div className="w-form-done" tabIndex="-1" role="region"
                            aria-label="Email Form 2 success">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail" tabIndex="-1" role="region"
                            aria-label="Email Form 2 failure">
                            <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    ReviewWatcher.initiateWatch(name);
    ReviewWatcher.subscribe(PUBLICATION.REVIEW);
    return {
        summary: ReviewWatcher.Summary,
    }
})(ReviewSummary);