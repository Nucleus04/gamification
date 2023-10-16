import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import GamificationWatcher from "../../../api/classes/client/Gamification/GamificationWatcher";
import { ADMIN, PUBLICATION, SESSION_KEYS } from "../../../api/common";

const profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
class ExchangeRequest extends Component {
    constructor(props) {
        super(props);
        GamificationWatcher.setWatcher(this, "gamification");
        this.props = props;
    }
    onApprove(id) {
        GamificationWatcher.onApprovedRequest(id);
    }

    onReject(id) {
        GamificationWatcher.onRejectRequest(id);
    }
    render() {
        return (
            <div className="request-approval-main-contianer">
                <div className="ry_cardtop" style={{ padding: "10px" }}>
                    <div className="div-block-395">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "7px", color: "green" }} width="25" height="25" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16"> <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" /> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" /> </svg>
                        {
                            profile[0].team === ADMIN ?
                                <div className="card_dashboard-label" style={{ color: "green", fontSize: "14pt" }}>Pending Exchange Request</div> :
                                <div className="card_dashboard-label" style={{ color: "green", fontSize: "14pt" }}>Exchange History</div>
                        }
                    </div>
                </div>
                <div className="request-list-container">
                    <div className="request-item-container">
                        {
                            this.props.history.length > 0 ? this.props.history.map((history) => {
                                return (
                                    <div className="request-item" key={history._id}>
                                        <p className="ry_p-style1 mb-0 text-darkblue text-semibold"><b>Redeemer: </b><span className="ry_p-style1 mb-0">{history.name}</span></p>
                                        <p className="ry_p-style1 mb-0 text-darkblue text-semibold"><b>Date: </b><span className="ry_p-style1 mb-0">{new Date(history.created_at).toDateString()}</span></p>
                                        <p className="ry_p-style1 mb-0 text-darkblue text-semibold"><b>Amount: </b><span className="ry_p-style1 mb-0">{history.credits}</span></p>
                                        <p className="ry_p-style1 mb-0 text-darkblue text-semibold"><b>Status: </b><span className={`table-text 
                                        ${history.status === "pending" ? "text-yellow" : history.status === "approved" ? "text-green" : history.status === "rejected" ? "text-red" : ""}`}>{history.status}</span></p>
                                        {
                                            profile[0].team === ADMIN ? (
                                                <div className="button-request-contianer">
                                                    <button className="ry_icon-btn-style1 bg-green" onClick={() => this.onApprove(history._id)}>Approve</button>
                                                    <button className="ry_icon-btn-style1 bg-red" onClick={() => this.onReject(history._id)}>Reject</button>
                                                </div>
                                            ) : ""
                                        }
                                    </div>
                                )
                            }) : (
                                profile[0].team === ADMIN ? <p style={{ textAlign: "center" }}>No pending request</p> : <p style={{ textAlign: "center" }}>No history of exchange</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    GamificationWatcher.initiateWatch("gamification");
    if (profile[0].team === ADMIN) {
        GamificationWatcher.subscribe(PUBLICATION.EXCHANGE_HISTORY, ADMIN);
    } else {
        GamificationWatcher.subscribe(PUBLICATION.EXCHANGE_HISTORY, profile[0].userId);
    }
    return {
        history: GamificationWatcher.ExchangeHistory(profile[0].team),
    }
})(ExchangeRequest);