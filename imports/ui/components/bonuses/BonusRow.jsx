import React, { Component } from "react";


class BonusRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details ? this.props.details.name : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>$ {this.props.details ? this.props.details.amount : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.details ? this.props.details.message : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className={`ry_badge-style1 ${this.props.details && this.props.details.status === "pending" ? "br-yellow" : ""}`}>{this.props.details ? this.props.details.status : ""}</div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div>{this.props.date}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BonusRow;