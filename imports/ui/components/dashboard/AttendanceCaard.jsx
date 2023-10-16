import React, { Component } from "react";
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";

class AttendanceCard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            present: 0,
            late: 0,
            earlyleaving: 0,
            lesstracking: 0,
            absent: 0,
        }
    }
    async retrieveActivity(filter) {
        let result = await DashboardWatcher.retrieveTodaysActivity(filter);
        this.setState({
            present: result.present,
            late: result.late,
            earlyleaving: result.earlyleave,
            lesstracking: result.lesstracking,
            absent: result.absent,
        })
    }
    handleFilterChoose(event) {
        this.retrieveActivity(event.target.value);
    }
    componentDidMount() {
        this.retrieveActivity()
    }
    render() {
        return (
            <div className="card_dashboard">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="card_dashboard-label">Attendance</div>
                            <div><select id="field-2" name="field-2" data-name="Field 2" onChange={this.handleFilterChoose.bind(this)}
                                className="ry_selectfieldsmall w-select">
                                <option value={null} >Today</option>
                                <option value="yesterday" >Yesterday</option>
                                {/* <option value="month" >Last 30 days</option> */}
                            </select></div>
                        </div>
                        <div className="ry_cardcontent-style1">
                            <div className="card_dashboard_top-left mb-10">
                                <div className="ry_icon-style2"><img
                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f13dcda12f6eb616b3ae6_icon_attendance.svg"
                                    loading="lazy" alt="" /></div>
                                <div className="div-block-382">
                                    <h1 className="ry_h4-display1">{this.state.present} of {this.state.present + this.state.absent} active</h1>
                                    {/* <div className="ry_p-style1">from yesterday (70)</div> */}
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="div-block-391 bg-red"></div>
                                    <p className="ry_p-style1 mb-0">Late</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{`${this.state.late}%`}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="div-block-391 bg-orange"></div>
                                    <p className="ry_p-style1 mb-0">Early Leaving</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{`${this.state.earlyleaving}%`}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="div-block-391 bg-violet"></div>
                                    <p className="ry_p-style1 mb-0">Less Tracking</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{`${this.state.lesstracking}%`}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="div-block-391 bg-gray"></div>
                                    <p className="ry_p-style1 mb-0">Absent</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{`${this.state.absent}`}</p>
                                </div>
                            </div>
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

export default AttendanceCard;