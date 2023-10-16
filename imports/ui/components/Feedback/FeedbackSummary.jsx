import React, { Component } from "react";

class FeedbackSummary extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            summary: null,
        }
    }
    getCurrentMonthAndYear() {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const currentDate = new Date();
        const currentMonth = months[currentDate.getMonth()];
        const currentYear = currentDate.getFullYear();

        return `${currentMonth} ${currentYear}`;
    }
    componentDidUpdate(prevState) {
        if (prevState.summary != this.props.summary) {
            this.setState({
                summary: this.props.summary
            })
        }
    }
    render() {
        return (
            <div className="ry_cardcontent-style1 mt-10">
                <div className="ry_cardcontent_row no-border">
                    <div className="ry_cardcontent_rowcol">
                        <p className="ry_p-style1 mb-0">Hire Date</p>
                    </div>
                    <div className="ry_cardcontent_rowcol justfiy-right">
                        <p className="ry_p-style1 mb-0 text-darkblue">{this.props.profile ? new Date(this.props.profile[0].hiredate).toDateString() : ""}</p>
                    </div>
                </div>
                <div className="ry_cardcontent_row no-border">
                    <div className="ry_cardcontent_rowcol">
                        <p className="ry_p-style1 mb-0">Review Cycle</p>
                    </div>
                    <div className="ry_cardcontent_rowcol justfiy-right">
                        <p className="ry_p-style1 mb-0 text-darkblue align-right">{this.getCurrentMonthAndYear()}</p>
                    </div>
                </div>
                <div className="ry_linedivider"></div>
            </div>
        )
    }
}


export default FeedbackSummary;