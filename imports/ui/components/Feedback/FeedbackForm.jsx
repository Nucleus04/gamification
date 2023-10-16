import React, { Component } from "react";
import ReviewWatcher from "../../../api/classes/client/ReviewWatcher/ReviewWatcher";
import { SESSION_KEYS } from "../../../api/common";
import FeedbackWatcher from "../../../api/classes/client/FeedbackWatcher/FeedbackWatcher";

class FeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            userName: "",
            recommendUser: [],
            targetUserName: "",
            targetUserId: null,
            communication: 0,
            teamwork: 0,
            integrity: 0,
            accountability: 0,
            note: "",
            profile: null,
        }
    }

    async onNameSearchChange(event) {
        const userInput = event.target.value.trim(); // Remove leading/trailing spaces
        let result = [];
        this.setState({
            userName: event.target.value,
        })
        if (userInput.length >= 2) {
            result = await ReviewWatcher.recommendUser(userInput)// Log the input if it's exactly 4 letters
            this.setState({
                recommendUser: result,
            })
        }
    }


    onUserPick(user) {
        this.setState({
            targetUserName: user.firstname + " " + user.lastname,
            targetUserId: user.userId,
            userName: "",
            recommendUser: [],
        });
    }

    onScoreChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }

    async onsubmit(event) {
        event.preventDefault();
        let doc = {
            userId: this.state.targetUserId,
            communication: this.state.communication,
            accountability: this.state.accountability,
            integrity: this.state.integrity,
            teamwork: this.state.teamwork,
            reviewer: this.state.profile[0].firstname + " " + this.state.profile[0].lastname,
            overall_score: Number(this.state.communication) + Number(this.state.integrity) + Number(this.state.teamwork) + Number(this.state.accountability),
            notes: this.state.note,
            created_at: new Date(),
        }
        if (this.state.targetUserId) {
            await FeedbackWatcher.submitFeedback(doc, this.state.targetUserId);
            this.setState({
                userName: "",
                recommendUser: [],
                targetUserName: "",
                targetUserId: "",
                communication: 0,
                teamwork: 0,
                integrity: 0,
                accountability: 0,
                note: "",
            })
        } else {
            alert("Oops! Reviwee is required. Search him/her below.");
        }
    }
    componentDidMount() {
        this.setState({
            profile: JSON.parse(localStorage.getItem(SESSION_KEYS.profile)),
        })
    }
    render() {
        return (
            <div className="w-form">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2" aria-label="Email Form" onSubmit={this.onsubmit.bind(this)}>
                    <div className="form-row"><label className="ry_field-label-style1">Who is this feedback about</label>
                        <div className="form-control">
                            <div className="div-block-397"><input type="text" className="ry_text-field-style1 w-input" maxLength="256"
                                name="name-2" placeholder="" required="" value={this.state.userName} onChange={this.onNameSearchChange.bind(this)} /></div>
                        </div>
                        {
                            this.state.recommendUser.map((user) => {
                                return (
                                    <div className={`ry_tag-style1 `} key={user._id} onClick={() => this.onUserPick(user)}>
                                        <div className={`ry_person-style2 profile-text S`}>S</div>
                                        <div >{user.firstname + " " + user.lastname}</div>
                                        <div className="ry_tag-style1_close"><img
                                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg"
                                            loading="lazy" alt="" /></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />
                    <div className="form-row"><label className="ry_field-label-style1">Reviewee</label>
                        <div className="form-control">
                            <div className="div-block-397"><input type="text" className="ry_text-field-style1 w-input" maxLength="256"
                                name="name-2" placeholder="" required value={this.state.targetUserName} disabled /></div>
                        </div>
                    </div>
                    <div className="form-row"><label className="ry_field-label-style1">Communication</label>
                        <div className="form-control">
                            <div className="div-block-397"><input type="number" className="ry_text-field-style1 w-input" maxLength="256"
                                name="communication" placeholder="" max={10} min={0} required value={this.state.communication} onChange={this.onScoreChange.bind(this)} /></div>
                        </div>
                    </div>
                    <div className="form-row"><label className="ry_field-label-style1">Teamwork</label>
                        <div className="form-control">
                            <div className="div-block-397"><input type="number" className="ry_text-field-style1 w-input" maxLength="256"
                                name="teamwork" placeholder="" required max={10} min={0} value={this.state.teamwork} onChange={this.onScoreChange.bind(this)} /></div>
                        </div>
                    </div>
                    <div className="form-row"><label className="ry_field-label-style1">Accountability</label>
                        <div className="form-control">
                            <div className="div-block-397"><input type="number" className="ry_text-field-style1 w-input" maxLength="256"
                                name="accountability" placeholder="" required max={10} min={0} value={this.state.accountability} onChange={this.onScoreChange.bind(this)} /></div>
                        </div>
                    </div>
                    <div className="form-row"><label className="ry_field-label-style1">Integrity</label>
                        <div className="form-control">
                            <div className="div-block-397"><input type="number" className="ry_text-field-style1 w-input" maxLength="256"
                                name="integrity" placeholder="" required max={10} min={0} value={this.state.integrity} onChange={this.onScoreChange.bind(this)} /></div>
                        </div>
                    </div>
                    <div className="form-row"><label className="ry_field-label-style1">Notes</label>
                        <div className="form-control"><textarea placeholder="" maxLength="5000" id="field-2" name="note"
                            data-name="Field 2" className="ry_text-area-style1 w-input" onChange={this.onScoreChange.bind(this)}></textarea></div>
                    </div>
                    <div className="ry_form-btn_containers"><button type="submit" className="ry_btn-style1 w-button">Submit</button></div>
                </form>

            </div>
        )
    }
}



export default FeedbackForm;