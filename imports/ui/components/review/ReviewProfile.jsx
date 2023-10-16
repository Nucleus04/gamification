import React, { Component } from "react";
import ReviewWatcher from "../../../api/classes/client/ReviewWatcher/ReviewWatcher";


class ReviewProfile extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            profile: {
                name: "",
                team: "",
            },
            reviewCount: {
                receive: "",
                given: ""
            },
        }
    }
    setProfile() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.setState({
            profile: {
                name: profile[0].firstname + " " + profile[0].lastname,
                team: profile[0].team,
            }
        })
    }

    async retrieveTotalNumberOfReviews() {
        let reviewCount = await ReviewWatcher.retreiveTotalReviewCount();
        this.setState({
            reviewCount: {
                receive: reviewCount.recievedCount,
                given: reviewCount.reviewedCount,
            }
        })
    }
    componentDidMount() {
        this.setProfile();
        this.retrieveTotalNumberOfReviews();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.update !== this.props.update) {
            this.retrieveTotalNumberOfReviews();
        }
    }
    render() {

        return (<div className="card_dashboard _w-100">
            <div className="card_dashboard_top-left">
                <div className={`ry_person-style1 ${this.state.profile.name.charAt(0)} profile-text`}>
                    {this.state.profile.name.charAt(0)}
                </div>
                <div className="div-block-382">
                    <h1 className="ry_h3-display1">{this.state.profile.name}</h1>
                    <div className="ry_p-style1">{this.state.profile.team}</div>
                </div>
            </div>
            <div className="card_dashboard_bottom">
                <div className="card_dashboard_bottomcol border">
                    <h1 className="ry_h3-display1 weight-semibold">{this.state.reviewCount.given}</h1>
                    <div className="ry_p-style1">Given</div>
                </div>
                <div className="card_dashboard_bottomcol">
                    <h1 className="ry_h3-display1 weight-semibold">{this.state.reviewCount.receive}</h1>
                    <div className="ry_p-style1">Received</div>
                </div>
            </div>
        </div>)
    }
}


export default ReviewProfile;