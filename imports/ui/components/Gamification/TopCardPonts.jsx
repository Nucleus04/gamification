import React, { Component } from "react";


class TopCardPoints extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className="card_dashboard_top _w-33 padding-20">
                <div className="card_dashboard_top-left justify-spacebetween">
                    <div className="div-block-382">
                        <div className="card_dashboard-label">Points</div>
                        <div className="ry_p-style1">Your total points</div>
                    </div>
                    <h1 className="ry_h3-display1 weight-semibold">100</h1>
                </div>
            </div>
        )
    }

}


export default TopCardPoints;