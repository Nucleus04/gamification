import React, { Component } from "react";


class GoalsSummary extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="card_dashboard _w-100">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2"
                        method="get" aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="div-block-395">
                                <div className="card_dashboard-label">Goals Summary</div>
                            </div>
                        </div>
                        <div className="ry_cardcontent-style1">
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0"></div>
                                    <p className="ry_p-style1 mb-0">On Track</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.props.summary ? this.props.summary.ontrack : ""}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0 bg-yellow"></div>
                                    <p className="ry_p-style1 mb-0">Behind</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.props.summary ? this.props.summary.behind : ""}</p>
                                </div>
                            </div>
                            <div className="ry_cardcontent_row no-border">
                                <div className="ry_cardcontent_rowcol">
                                    <div className="ry_goalsstatus mt-0 bg-red"></div>
                                    <p className="ry_p-style1 mb-0">At Risk</p>
                                </div>
                                <div className="ry_cardcontent_rowcol _w-10">
                                    <p className="ry_p-style1 mb-0 text-darkblue">{this.props.summary ? this.props.summary.atrisk : ""}</p>
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



export default GoalsSummary;