import React, { Component } from "react";
import SettingWatcher from "../../../api/classes/client/SettingsWatcher/SettingWatcher";


class SettingsForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            firstname: "",
            lastname: "",
            timezone: "",
            profile: "",
        }
    }

    handleFirstName(event) {
        this.setState({
            firstname: event.target.value,
        })
    }
    handleLastName(event) {
        this.setState({
            lastname: event.target.value,
        })
    }
    handleTimeZone(event) {
        this.setState({
            timezone: event.target.value,
        })
    }
    async handleSubmit(event) {
        event.preventDefault();
        let result = await SettingWatcher.updateProfile(this.state.firstname, this.state.lastname, this.state.timezone);
        if (result === 1) {
            alert("Updated Successfully");
        } else {
            alert("There is problem, please refresh the page.");
        }

    }
    componentDidMount() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.setState({
            profile: profile,
            firstname: profile[0].firstname,
            lastname: profile[0].lastname,
            timezone: profile[0].timezone,
        })
    }
    render() {
        return (
            <div class="w-form">
                <form id="email-form-2" name="email-form-2" data-name="Email Form 2" onSubmit={this.handleSubmit.bind(this)}
                    method="get" aria-label="Email Form 2">
                    <div class="ry_formrow">
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">First Name</label>
                                <div class="form-control"><input type="text" onChange={this.handleFirstName.bind(this)}
                                    class="ry_text-field-style1 w-input" value={this.state.firstname}
                                    maxlength="256" name="name-2" data-name="Name 2"
                                    placeholder="" id="name-2" /></div>
                            </div>
                        </div>
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">Last Name</label>
                                <div class="form-control"><input type="text" onChange={this.handleLastName.bind(this)}
                                    class="ry_text-field-style1 w-input" value={this.state.lastname}
                                    maxlength="256" name="name-2" data-name="Name 2"
                                    placeholder="" id="name-2" /></div>
                            </div>
                        </div>
                    </div>
                    <div class="ry_formrow">
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">Your Timezone</label>
                                <div class="form-control"><input type="text" onChange={this.handleTimeZone.bind(this)}
                                    class="ry_text-field-style1 w-input" value={this.state.timezone}
                                    maxlength="256" name="name-2" data-name="Name 2"
                                    placeholder="(UTC+00:00) UTC" id="name-2" /></div>
                            </div>
                        </div>
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">API Token</label>
                                <div class="form-control">
                                    <div class="div-block-397"><input type="text"
                                        class="ry_text-field-style1 w-input"
                                        maxlength="256" name="name-2"
                                        data-name="Name 2" placeholder=""
                                        id="name-2" /><a href="#"
                                            class="ry_small-btn-style1 bg-cyan w-button">Generate</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ry_formrow">
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">Email</label>
                                <div class="form-control"><input type="text"
                                    class="ry_text-field-style1 w-input"
                                    maxlength="256" name="name-2" data-name="Name 2"
                                    placeholder="" id="name-2" /></div>
                            </div>
                        </div>
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">Birthday</label>
                                <div class="form-control"><input type="text"
                                    class="ry_text-field-style1 w-input"
                                    maxlength="256" name="name-2" data-name="Name 2"
                                    placeholder="" id="name-2" /></div>
                            </div>
                        </div>
                    </div>
                    <div class="ry_formrow">
                        <div class="ry_formcol">
                            <div class="form-row"><label for=""
                                class="ry_field-label-style1">Workspace Name</label>
                                <div class="form-control"><input type="text"
                                    class="ry_text-field-style1 w-input"
                                    maxlength="256" name="name-2" data-name="Name 2"
                                    placeholder="" id="name-2" /></div>
                            </div>
                        </div>
                    </div>
                    <button class="ry_icon-btn-style1 bg-cyan w-inline-block" type="submit">
                        <div>Update</div>
                    </button>
                </form>
                <div class="w-form-done" tabindex="-1" role="region"
                    aria-label="Email Form 2 success">
                    <div>Thank you! Your submission has been received!</div>
                </div>
                <div class="w-form-fail" tabindex="-1" role="region"
                    aria-label="Email Form 2 failure">
                    <div>Oops! Something went wrong while submitting the form.</div>
                </div>
            </div>
        )
    }
}


export default SettingsForm;