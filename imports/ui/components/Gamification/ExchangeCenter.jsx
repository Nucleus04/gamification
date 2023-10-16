import React, { Component } from "react";
import GamificationWatcher from "../../../api/classes/client/Gamification/GamificationWatcher";
import { withTracker } from "meteor/react-meteor-data";
import { ADMIN, PUBLICATION, SESSION_KEYS } from "../../../api/common";


class ExchangeCenter extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        GamificationWatcher.setWatcher(this, "gamification");
        this.state = {
            pointsExchange: 0,
            creditsExchange: 0,
            redeemPoints: 0,
            redeemEquivalent: 0,
            profile: JSON.parse(localStorage.getItem(SESSION_KEYS.profile)),
        }
    }

    onExchangeUpdate(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }

    async onUpdate(event) {
        event.preventDefault();
        await GamificationWatcher.updateRate(this.state.pointsExchange, this.state.creditsExchange)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rate !== this.props.rate) {
            if (this.props.rate.length > 0) {
                this.setState({
                    pointsExchange: this.props.rate[0].points,
                    creditsExchange: this.props.rate[0].credits,
                })
            }
        }
    }

    calculateCreditExchange(points) {
        return Math.floor(Number(points) * (Number(this.props.rate[0].credits) / Number(this.props.rate[0].points)));
    }

    onRedeemInput(event) {
        this.setState({
            redeemPoints: event.target.value,
            redeemEquivalent: this.calculateCreditExchange(event.target.value),
        })
    }

    async onConfirm(event) {
        event.preventDefault();
        if (window.confirm(`Are you sure you want to exchange ${this.state.redeemPoints} points for credits?`)) {
            let currentPoints = GamificationWatcher.PointsAndCredits(Meteor.userId());
            if (Number(currentPoints[0].points) < Number(this.state.redeemPoints)) {
                alert("Insufficient points!")
            } else {
                await GamificationWatcher.exchangePoints(this.state.profile[0], this.state.redeemEquivalent, this.state.redeemPoints);
            }
        }
    }
    render() {
        return (
            <div className="card_dashboard _w-100">
                <div className="w-form">
                    <div id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="div-block-395">
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "7px", color: "#fbb03b" }} width="25" height="25" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" /> </svg>

                                <div className="card_dashboard-label" style={{ color: "#fbb03b", fontSize: "14pt" }}>Exchange Center</div>
                            </div>
                        </div>
                        <div className="ry_cardcontent-style1">
                            <div className="card_dashboard-label">Exchange Rate: </div>
                            {
                                this.state.profile[0].team === ADMIN ? (
                                    <form onSubmit={this.onUpdate.bind(this)}>
                                        <p className="ry_p-style1 mb-0">
                                            <input type="number" name="pointsExchange" value={this.state.pointsExchange} onChange={this.onExchangeUpdate.bind(this)} min={1} style={{ width: "40px" }} /> points =
                                            <input type="number" name="creditsExchange" value={this.state.creditsExchange} onChange={this.onExchangeUpdate.bind(this)} min={1} style={{ width: "40px" }} /> credits</p>
                                        <button className="ry_icon-btn-style1 w-inline-block" style={{ marginTop: "10px" }} type="submit" >Update</button>
                                    </form>
                                ) : (
                                    <p className="ry_p-style1 mb-0"> {this.state.pointsExchange} points = {this.state.creditsExchange} credits</p>
                                )
                            }
                        </div>


                        {
                            this.state.profile[0].team !== ADMIN ?
                                <div>
                                    <br /><br />
                                    <form name="exchange-credits" onSubmit={this.onConfirm.bind(this)}>
                                        <label htmlFor="point">Points</label>
                                        <input type="number" name="point" style={{ borderRadius: "10px" }} min={this.state.pointsExchange} value={this.state.redeemPoints} onChange={this.onRedeemInput.bind(this)} />
                                        <label htmlFor="credits">Equivalent Credits : </label>
                                        <p className="ry_p-style1 mb-0">{this.state.redeemEquivalent} </p> <br />
                                        <button className="ry_icon-btn-style1 w-inline-block" style={{ width: "100%" }}>Confirm</button>
                                    </form>
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}



export default withTracker(() => {
    GamificationWatcher.initiateWatch("gamification");
    GamificationWatcher.subscribe(PUBLICATION.EXCHANGE_RATE);
    return {
        rate: GamificationWatcher.exchangeRate,
    }
})(ExchangeCenter);