import React, { Component } from "react";
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";
import ActivityRow from "./ActivityRow";


class TOdaysActivity extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activity: [],
        }
    }
    async retrievePresent(filter) {
        let result = await DashboardWatcher.retrieveActivity(filter);
        this.setState({
            activity: result,
        })
    }
    handleFilterChoose(event) {
        this.retrievePresent(event.target.value);
    }
    componentDidMount() {
        this.retrievePresent();
    }
    render() {
        return (
            <div className="card_dashboard">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="card_dashboard-label">Todays' Activity</div>
                            <div><select id="field-2" name="field-2" data-name="Field 2" onChange={this.handleFilterChoose.bind(this)}
                                className="ry_selectfieldsmall w-select">
                                <option value={null} >Today</option>
                                <option value="yesterday" >Yesterday</option>
                                {/* <option value="month" >Last 30 days</option> */}
                            </select></div>
                        </div>
                        <div className="ry_cardcontent-style1">

                            {
                                this.state.activity ? this.state.activity.map((element) => {
                                    return (
                                        <ActivityRow element={element} key={element.userId} />
                                    )
                                }) : ""
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
        )
    }
}


export default TOdaysActivity;