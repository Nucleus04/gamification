import React, { Component } from "react";
import AveOfficeTime from "./AveOfficeTime";
import AvgActiveTime from "./AvgActiveTime";
import AveProductivity from "./AveProductivity";
import TimeSheetWatcher from "../../../api/classes/client/TimeSheetWatcher/TimeSheetWatcher";



class TopCardReport extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            officedata: null,
        }
    }
    async retrieveTopCardReport() {
        let result = await TimeSheetWatcher.retrieveTopCardData();
        this.setState({
            officedata: result
        })
    }
    componentDidMount() {
        this.retrieveTopCardReport();
    }
    render() {
        return (
            <div className="reports_top-card_container">
                <AveOfficeTime data={this.state.officedata ? this.state.officedata.officeHour : null} />
                <AvgActiveTime data={this.state.officedata ? this.state.officedata.activeTime : null} />
                <AveProductivity data={this.state.officedata ? this.state.officedata.productivity : null} />
            </div>
        )
    }
}



export default TopCardReport;