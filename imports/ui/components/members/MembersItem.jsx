import React, { Component } from "react";
import MemberWathcer from "../../../api/classes/client/MembersWatcher/MemberWathcer";


class MembersItem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            productivityDetails: null,
            profile: JSON.parse(localStorage.getItem('profile')),
        }
    }
    async retreiveAverageTime() {
        let result = await MemberWathcer.retreiveAveOfficeTime(this.props.details.userId)
        this.setState({
            productivityDetails: result,
        })
    }
    componentDidMount() {
        this.retreiveAverageTime();
    }
    render() {
        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="div-block-398">
                            <div className={`ry_person-style2 profile-text ${this.props.details.firstname.charAt(0)}`}>{this.props.details.firstname.charAt(0)}</div>
                            <div className="table-text">
                                <div>{this.props.details.firstname + " " + this.props.details.lastname}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details.team}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _20">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.productivityDetails ? `${this.state.productivityDetails.numberOfHours}:` : ""}{this.state.productivityDetails ? `${this.state.productivityDetails.numberOfMinutes} h` : "--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text text-green">
                            <div>{this.state.productivityDetails ? `${parseFloat(this.state.productivityDetails.productivityLevel).toFixed(2)} %` : "--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.state.productivityDetails ? this.state.productivityDetails.numberOfHours * this.state.profile[0].salary_rate_per_hour : "--"}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="ry_options"><img
                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default MembersItem;