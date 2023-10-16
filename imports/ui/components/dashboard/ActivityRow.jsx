import React, { Component } from "react";
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";

class ActivityRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            profile: null,
        }
    }
    async retrieveUserName(id) {
        let result = await DashboardWatcher.retrieveUserName(id);
        this.setState({
            profile: result,
        })

    }
    componentDidMount() {
        this.retrieveUserName(this.props.element.userId);
    }
    render() {
        return (
            <div className="ry_cardcontent_row">
                <div className="ry_cardcontent_rowcol">
                    <div className={`ry_person-style2 ${this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""} profile-text`}>{this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}</div>
                    <p className="ry_p-style1 mb-0">{this.state.profile ? this.state.profile[0].firstname + " " + this.state.profile[0].lastname : ""}</p>
                </div>
                <div className="ry_cardcontent_rowcol _w-25">
                    <p className="ry_p-style1 mb-0">{this.props.element.hours}</p>
                </div>
                <div className="ry_cardcontent_rowcol _w-10">
                    <p className="ry_p-style1 mb-0 text-green">{`${this.props.element.percentage}%`}</p>
                </div>
            </div>
        )
    }
}



export default ActivityRow;