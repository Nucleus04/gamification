import React, { Component } from "react";
import AuthenticationWatcher from "../../api/classes/client/Authentication/AuthenticationWatcher";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import HubstaffWatcher from "../../api/classes/client/Authentication/HubstaffWatcher";
import { SESSION_KEYS } from "../../api/common";
import { Link } from "react-router-dom";
import DashboardWatcher from "../../api/classes/client/DashboardWatcher/DashboardWatcher";

function Login() {
    const navigate = useNavigate();
    return (
        <LoginComponent navigate={navigate} />
    )
}
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: "",
            password: "",
            error: "",
        }
    }
    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        //localStorage.removeItem(SESSION_KEYS.access_token);

        let result = await AuthenticationWatcher.login(this.state.email, this.state.password);
        if (result) {
            localStorage.setItem('auth', Meteor.userId())
            let access_token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
            if (access_token) {
                await DashboardWatcher.retrieveProfile();
                this.props.navigate('/goals')
            } else {
                await DashboardWatcher.retrieveProfile();
                const nonce = HubstaffWatcher.generateNonce();
                let credential = await HubstaffWatcher.getAPICredentials();
                const authorizationUrl = `${credential.authorization_endpoint}?client_id=${credential.client_id}&response_type=code&nonce=${nonce}&redirect_uri=${credential.redirect_uri}&scope=openid profile email hubstaff:read`;
                window.location.href = authorizationUrl;
            }
        } else {
            this.setState({
                error: "Incorrect login credentials"
            })
        }
    }


    render() {
        return (
            <div className="ry_app-main-wrapper-style1">
                <div className="ry_card_sign-in-style1_container">
                    <div className="ry_card_sign-in-style1">
                        <div className="form-block w-form">
                            <form onSubmit={this.handleSubmit.bind(this)} id="email-form" name="email-form" data-name="Email Form" method="post"
                                aria-label="Email Form">
                                <div className="ry_sign-in-header">
                                    <h3 className="ry_h1-display1" >PERFORMANCE TRACKER</h3>
                                    <h3 className="ry_h1-display1">Welcome Back</h3>
                                    <p className="ry_sign-in-p-style1">Enter your credential to access your account</p>
                                </div>
                                {/* add container for error message with inline css here */}
                                {this.state.error && (
                                    <div style={{ color: 'red', margin: '10px 0', textAlign: 'center' }}>{this.state.error}</div>
                                )}
                                <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Email</label>
                                    <div className="form-control">
                                        <input type="text"
                                            className="ry_text-field-style1 w-input"
                                            maxLength="256"
                                            name="name-2"
                                            data-name="Name 2"
                                            placeholder="Email Address"
                                            onChange={this.onEmailChange.bind(this)}
                                            id="name-1"
                                            required /></div>
                                </div>
                                <div className="form-row"><label htmlFor="" className="ry_field-label-style1">Password</label>
                                    <div className="form-control">
                                        <input type="password"
                                            className="ry_text-field-style1 w-input"
                                            maxLength="256"
                                            name="name-2"
                                            data-name="Name 2"
                                            placeholder="Password"
                                            id="name-2"
                                            onChange={this.onPasswordChange.bind(this)}
                                            required /></div>
                                </div>
                                <div className="div-block"><a href="/reset-password" className="ry_link-style1">Forgot Password?</a>
                                </div>
                                <div className="ry_btn-container"><button type="submit"
                                    className="ry_btn-style1 _w-100 w-button">Sign In</button></div>
                            </form>
                            <div className="w-form-done" tabIndex="-1" role="region" aria-label="Email Form success">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail" tabIndex="-1" role="region" aria-label="Email Form failure">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                        <div className="div-block-2">
                            <p className="ry_sign-in-p-style1">Don't have an account yet? <Link to="/sign-up"
                                className="ry_span-link-style1">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;