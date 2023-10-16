import React, { Component } from "react";

class AveOfficeTime extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card_dashboard_top _w-33 padding-20">
                <div className="card_dashboard_top-left justify-spacebetween">
                    <div className="div-block-382">
                        <div className="card_dashboard-label">Office Time</div>
                        <div className="ry_p-style1">Average per Shift</div>
                    </div>
                    <h1 className="ry_h3-display1 weight-semibold">{this.props.data} h</h1>
                </div>
            </div>
        )
    }
}


export default AveOfficeTime;