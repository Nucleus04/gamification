import React, { Component } from "react";
import ReviewWatcher from "../../../api/classes/client/ReviewWatcher/ReviewWatcher";
import { withTracker } from "meteor/react-meteor-data";


const name = "review";
class ReviewAddModal extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        ReviewWatcher.setWatcher(this, name);
        this.state = ({
            recommendedNames: [],
            userName: "",
            showUserList: true,
            reciever: null,
            message: ""
        })

    }
    handleClose() {
        this.props.closeModal(false);
    }

    async handleInputChange(event) {
        const userInput = event.target.value.trim(); // Remove leading/trailing spaces
        let result = [];
        this.setState({
            userName: event.target.value,
            showUserList: true
        })
        if (userInput.length >= 2) {
            result = await ReviewWatcher.recommendUser(userInput)// Log the input if it's exactly 4 letters
            this.setState({
                recommendedNames: result,
            })
        }

    }
    handleReviewMessageChange(event) {
        this.setState({
            message: event.target.value,
        })
    }
    handleUserSelect(item) {
        this.setState({
            userName: item.firstname + " " + item.lastname,
            showUserList: false,
            reciever: item,
        })
    }
    async handleReviewSubmit() {
        const input = {
            receiver: this.state.reciever,
            message: this.state.message,
        }
        this.handleClose();
        await ReviewWatcher.submitReview(input);


        this.setState({
            recommendedNames: [],
            userName: "",
            showUserList: true,
            reciever: null,
            message: ""

        })
    }
    render() {

        return (
            <div className={`ry_popup ${this.props.showModal ? "" : "display-none"}`}>
                <div className="ry_popup-top">
                    <div className="ry_popup-header">Add Review</div>
                    <div data-w-id="5d81c86f-4898-b745-db4d-8bd43c636127" className="ry_icon-close" onClick={this.handleClose.bind(this)}><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg"
                        loading="lazy" alt="" /></div>
                </div>
                <div className="w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2"
                        aria-label="Email Form">
                        <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Who is this review review about?</label>
                            <div className="form-control">
                                <div className="div-block-397"><input type="text" className="ry_text-field-style1 w-input" maxLength="256" onChange={this.handleInputChange.bind(this)}
                                    name="name-2" placeholder="" value={this.state.userName} required />
                                    {/* <a href="#"
                                        className="ry_icon-btn-style1 bg-cyan w-inline-block"><img
                                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                            loading="lazy" alt="" className="icon-btn_asset" />
                                        <div>Add</div>
                                    </a> */}
                                </div>
                            </div>
                            {
                                this.state.recommendedNames.map((item) => {
                                    return (
                                        <div className={`ry_tag-style1 ${this.state.showUserList ? "" : "display-none"}`} onClick={() => this.handleUserSelect(item)} key={item._id}>
                                            <div className="ry_tag-style1_image"><img
                                                src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f8ffe4801b4008c8aa_person_03.png"
                                                loading="lazy" width="15" alt="" /></div>
                                            <div>{item.firstname + " " + item.lastname}</div>
                                            {/* <div className="ry_tag-style1_close"><img
                                                src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg"
                                                loading="lazy" alt="" /></div> */}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* <div className="form-row"><label for="" className="ry_field-label-style1">Who will you share this feedback
                            with?</label>
                            <div className="form-control"><label className="radio-button-field w-radio">
                                <div
                                    className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                </div><input type="radio" data-name="Radio" id="radio" name="radio" value="Radio"
                                    style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span className="radio-button-label w-form-label"
                                        for="radio">Entire Company</span>
                            </label><label className="radio-button-field w-radio">
                                    <div
                                        className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                    </div><input type="radio" data-name="Radio 4" id="radio-4" name="radio" value="Radio"
                                        style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span className="radio-button-label w-form-label"
                                            for="radio-4">Subject</span>
                                </label><label className="radio-button-field w-radio">
                                    <div
                                        className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                    </div><input type="radio" data-name="Radio 3" id="radio-3" name="radio" value="Radio"
                                        style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span className="radio-button-label w-form-label"
                                            for="radio-3">Only Subject's Manager</span>
                                </label><label className="radio-button-field w-radio">
                                    <div
                                        className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                    </div><input type="radio" data-name="Radio 2" id="radio-2" name="radio" value="Radio"
                                        style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span className="radio-button-label w-form-label"
                                            for="radio-2">Do Not Share <span className="span-comment">(Private Note)</span></span>
                                </label></div>
                        </div> */}

                        <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Review</label>
                            <div className="form-control"><textarea placeholder="" maxLength="5000" id="field-2" name="field-2"
                                data-name="Field 2" className="ry_text-area-style1 w-input" onChange={this.handleReviewMessageChange.bind(this)} value={this.state.message} required></textarea></div>
                        </div>
                        <div className="ry_form-btn_containers" onClick={this.handleReviewSubmit.bind(this)}><a href="#" className="ry_btn-style1 w-button">Submit</a></div>
                    </form>
                    <div className="w-form-done" tabIndex="-1" role="region" aria-label="Email Form success">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail" tabIndex="-1" role="region" aria-label="Email Form failure">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    ReviewWatcher.initiateWatch(name);
})(ReviewAddModal);