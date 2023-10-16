import React, { Component } from "react";


class TeamsItem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    render() {
        return (
            <div className="ry_review" onClick={() => this.props.teamClick(this.props.details.team)}>
                <div className="ry_reviewright flex-horizontal">
                    <div className="ry_reviewrighttop flex-vertical">
                        <p className="ry_p-style1 mb-0 text-darkblue text-semibold">{this.props.details ? this.props.details.team : ""}</p>
                    </div>
                    <div className="ry_reviewrightbottom flex-vertical mr-20">
                        <div className="ry_reviewmicro">
                            <div className="ry_reviewmicro_icon"><img
                                src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648063b66e52ed7caca82b33_teams_01.svg"
                                loading="lazy" alt="" /></div>
                            <div>{this.props.details ? this.props.details.count : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="ry_options"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                    loading="lazy" alt="" /></div>
            </div>
        )
    }
}


export default TeamsItem;