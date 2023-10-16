import React, { Component } from "react";
import GoalsWatcher from "../../../api/classes/client/GoalsWatcher/GoalsWatcher";

class AddGoalsComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            description: "",
            due_date: null,
        }
    }
    handleGoalsDescriptionChange(event) {
        this.setState({
            description: event.target.value
        })
    }
    handleGoalsDateChange(event) {
        this.setState({
            due_date: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        GoalsWatcher.addGoals(this.state.description, this.state.due_date);
        this.props.closeModal();
        this.setState({
            due_date: null,
            description: ""
        });
    }
    render() {

        return (
            <div className={`ry_popup ${this.props.showModal ? "" : "display-none"}`}>
                <div className="ry_popup-top">
                    <div className="ry_popup-header">Add Goals</div>
                    <div data-w-id="5d81c86f-4898-b745-db4d-8bd43c636127" className="ry_icon-close" onClick={() => this.props.closeModal()}><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg"
                        loading="lazy" alt="" /></div>
                </div>
                <div className="w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2" onSubmit={this.handleSubmit.bind(this)}
                        aria-label="Email Form">
                        <div className="form-row">
                            <label htmlFor="" className="ry_field-label-style1">Due Date</label>
                            <div className="form-control">
                                <div className="div-block-397"><input type="date" className="ry_text-field-style1 w-input" maxLength="256"
                                    name="name-2" placeholder="" onChange={this.handleGoalsDateChange.bind(this)} value={this.state.date} required />
                                </div>
                            </div>
                        </div>

                        <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Description</label>
                            <div className="form-control"><textarea placeholder="" maxLength="5000" id="field-2" name="field-2"
                                data-name="Field 2" className="ry_text-area-style1 w-input" onChange={this.handleGoalsDescriptionChange.bind(this)} value={this.state.description} required></textarea></div>
                        </div>
                        <div className="ry_form-btn_containers" ><button href="#" className="ry_btn-style1 w-button" type="submit">Submit</button></div>
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


export default AddGoalsComponent;