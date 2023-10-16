import React, { Component } from "react";


class TeamsMembersList extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="card_dashboard _w-100">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop bordered">
                            <div className="div-block-395 flex-vertical">
                                <div className="card_dashboard-label">Teammembers</div>
                                <div className="card_dashboard-label text-small">{this.props.team}</div>
                            </div>
                        </div>
                        <div className="ry_cardcontent-style1">

                            {
                                this.props.members ? this.props.members.map((element) => {
                                    return (
                                        <div className="ry_cardcontent_row no-border" key={element._id}>
                                            <div className="ry_cardcontent_rowcol">
                                                <div className={`ry_person-style2 profile-text ${element.firstname.charAt(0)}`}>{element.firstname.charAt(0)}</div>
                                                <p className="ry_p-style1 mb-0">{element.firstname + " " + element.lastname}</p>
                                            </div>
                                            <div className="ry_cardcontent_rowcol _w-10">
                                                <div className="ry_options ml-0"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                                                    loading="lazy" alt="" /></div>
                                            </div>
                                        </div>
                                    )
                                }) : ""
                            }

                        </div>
                    </form>
                    <div className="w-form-done" tabIndex="-1" role="region" aria-label="Email Form 2 success">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail" tabIndex="-1" role="region" aria-label="Email Form 2 failure">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TeamsMembersList;