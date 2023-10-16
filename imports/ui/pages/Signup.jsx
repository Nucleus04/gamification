import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationWatcher from "../../api/classes/client/Authentication/AuthenticationWatcher";

function Signup() {
    const naviagate = useNavigate();
    return (
        <SignupComponent navigate={naviagate} />
    )
}
class SignupComponent extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            firstname: "",
            email: "",
            password: "",
            lastname: "",
            role: '',
            customRole: '',
        }
    }
    onFullnameChange(event) {
        this.setState({
            firstname: event.target.value,
        })
    }
    onEmailChange(event) {
        this.setState({
            email: event.target.value,
        })
    }
    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
        })
    }
    onLastnameChange(event) {
        this.setState({
            lastname: event.target.value,
        })
    }
    // Handler for role selection
    onRoleChange = (e) => {
        const selectedRole = e.target.value;
        if (selectedRole === 'other') {
            this.setState({ role: selectedRole });
        } else {
            this.setState({ role: selectedRole, customRole: '' });
        }
    };

    // Handler for custom role input
    onCustomRoleChange = (e) => {
        this.setState({ customRole: e.target.value });
    };
    signUp(event) {
        event.preventDefault();
        Accounts.createUser({
            email: this.state.email,
            password: this.state.password
        }, async (err) => {
            if (err) {
                alert(err.reason)
            } else {
                await AuthenticationWatcher.createProfile(Meteor.userId(), this.state.firstname.charAt(0).toUpperCase() + this.state.firstname.slice(1), this.state.lastname.charAt(0).toUpperCase() + this.state.lastname.slice(1), this.state.role === "other" ? this.state.customRole.charAt(0).toUpperCase() + this.state.customRole.slice(1) : this.state.role.charAt(0).toUpperCase() + this.state.role.slice(1));
                alert("Registered Successfully");
                this.props.navigate("/");
            }
        })

    }
    render() {
        return (
            <div className="ry_app-main-wrapper-style1">
                {/* <a href="#" className="logo_link-style1 w-inline-block"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647ee69070fda82b7c14bbf4_signup_logo.svg"
                    loading="lazy" alt="" className="image" /></a> */}
                <div className="ry_card_sign-in-style1_container">
                    <div className="ry_card_sign-in-style1">
                        <div className="form-block w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get" aria-label="Email Form" onSubmit={this.signUp.bind(this)}>
                                <div className="ry_sign-in-header">
                                    <h3 className="ry_h1-display1">PERFORMANCE TRACKER</h3>
                                    <h3 className="ry_h1-display1">Register</h3>
                                    <p className="ry_sign-in-p-style1">Please fill the details and create account</p>
                                </div>
                                <div className="form-row"><label htmlFor="" className="ry_field-label-style1">First Name</label>
                                    <div className="form-control"><input type="text" className="ry_text-field-style1 w-input"
                                        maxLength="256" name="name-2" data-name="Name 2" placeholder="Name" id="name-2" required onChange={this.onFullnameChange.bind(this)} /></div>
                                </div>
                                <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Last Name</label>
                                    <div className="form-control"><input type="text" className="ry_text-field-style1 w-input"
                                        maxLength="256" name="name-2" data-name="Name 2" placeholder="Name" id="name-22" required onChange={this.onLastnameChange.bind(this)} /></div>
                                </div>
                                <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Email</label>
                                    <div className="form-control"><input type="text" className="ry_text-field-style1 w-input" typeof="email"
                                        maxLength="256" name="name-2" data-name="Name 2" placeholder="Email Address"
                                        id="name-2" required onChange={this.onEmailChange.bind(this)} /></div>
                                </div>



                                <div className="form-row">
                                    <label htmlFor="role" className="ry_field-label-style1">
                                        Role
                                    </label>
                                    <div className="form-control">
                                        <select
                                            className="ry_text-field-style1 w-select"
                                            id="role"
                                            name="role"
                                            onChange={this.onRoleChange}
                                            value={this.state.role}
                                            required
                                        >
                                            <option value="">Select a role</option>
                                            <option value="developer">Developer</option>
                                            <option value="hr">HR</option>
                                            <option value="manager">Manager</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {this.state.role === 'other' && (
                                    <div className="form-row">
                                        <label htmlFor="customRole" className="ry_field-label-style1">
                                            Custom Role
                                        </label>
                                        <div className="form-control">
                                            <input
                                                type="text"
                                                className="ry_text-field-style1 w-input"
                                                name="customRole"
                                                placeholder="Custom Role"
                                                value={this.state.customRole}
                                                onChange={this.onCustomRoleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}




                                <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Password</label>
                                    <div className="form-control"><input type="text" className="ry_text-field-style1 w-input"
                                        maxLength="256" name="name-2" data-name="Name 2" placeholder="Password" id="name-2" typeof="password" required onChange={this.onPasswordChange.bind(this)} />
                                    </div>
                                </div>
                                <div className="ry_btn-container"><button className="ry_btn-style1 _w-100 w-button" type="submit">Sign up</button>
                                </div>
                            </form>
                            <div className="div-block-2">
                                <p className="ry_sign-in-p-style1">Already have an account? <Link to="/" className="ry_span-link-style1">Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;