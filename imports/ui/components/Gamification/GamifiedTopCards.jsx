import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import GamificationWatcher from "../../../api/classes/client/Gamification/GamificationWatcher";
import { PUBLICATION } from "../../../api/common";


class GamifiedTopCards extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        GamificationWatcher.setWatcher(this, "gamification");
    }


    render() {
        return (
            <div className="reports_top-card_container">
                <div className="card_dashboard_top _w-33 padding-20">
                    <div className="card_dashboard_top-left justify-spacebetween">
                        <div className="div-block-382">
                            <div className="card_dashboard-label">Points</div>
                            <div className="ry_p-style1">Your total points</div>
                        </div>

                        <span className="ry_h3-display1 weight-semibold">{this.props.myPoints ? this.props.myPoints.points : 0}</span>
                        <svg style={{ color: "gold" }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16"> <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" /> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /> <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" /> </svg>

                    </div>
                </div>
                <div className="card_dashboard_top _w-33 padding-20" >
                    <div className="card_dashboard_top-left justify-spacebetween">
                        <div className="div-block-382">
                            <div className="card_dashboard-label">Credits</div>
                            <div className="ry_p-style1">Your total credits</div>
                        </div>

                        <h1 className="ry_h3-display1 weight-semibold" style={{ width: "50" }}>{this.props.myPoints ? this.props.myPoints.credits : 0} </h1>
                        <svg style={{ color: "rgb(0, 158, 76)" }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16"> <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#009e4c"></path> <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" fill="#009e4c"></path> </svg>
                    </div>
                </div>
                <div className="card_dashboard_top _w-33 padding-20" >
                    <div className="card_dashboard_top-left justify-spacebetween">
                        <div className="div-block-382">
                            <div className="card_dashboard-label">Highest Point:</div>
                            <div className="ry_p-style1">Highest point reached: </div>
                        </div>

                        <span className="ry_h3-display1 weight-semibold">{this.props.myPoints ? this.props.myPoints.highest_point : 0}</span>
                        <svg style={{ color: "rgb(255, 231, 71)" }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-trophy-fill" viewBox="0 0 16 16"> <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" fill="#ffe747"></path> </svg>
                        {/* <svg style={{ color: "rgb(97, 237, 255)" }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16"> <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" fill="#61edff"></path> </svg> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    GamificationWatcher.initiateWatch("gamification");
    GamificationWatcher.subscribe(PUBLICATION.GAMIFIED_POINTS_CREDITS, Meteor.userId());
    let points = GamificationWatcher.PointsAndCredits(Meteor.userId());
    return {
        myPoints: points.length > 0 ? points[0] : null,
    }
})(GamifiedTopCards);