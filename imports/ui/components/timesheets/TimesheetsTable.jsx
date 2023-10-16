import React, { Component } from "react";
import TimeSheetWatcher from "../../../api/classes/client/TimeSheetWatcher/TimeSheetWatcher";
const watcherName = "TIMESHEET";
import { withTracker } from "meteor/react-meteor-data";
import TimesheetsRow from "./TimesheetsRow";

class TimesheetsTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    async retrieveTimesheet() {
        await TimeSheetWatcher.retrieveTimeSheet();
    }
    componentDidMount() {
        this.retrieveTimesheet();
    }
    showMore() {
        TimeSheetWatcher.retrieveTimeSheet();
    }
    render() {

        return (
            <div className="card_table">
                <div className="rb-table students">
                    <div className="rb-table-hd">
                        <div className="rb-table-col stretch">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Name</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _15">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Team</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _15">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Date</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _20">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Office Time</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _15">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Productivity</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _15">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Earnings ($)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rb-table-content">


                        {
                            this.props.timesheet ? this.props.timesheet.map((element) => {
                                return (
                                    <TimesheetsRow key={element._id} timesheet={element} />
                                )
                            }) : ""
                        }
                        <div className="show-more" onClick={this.showMore.bind(this)}>Show More</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    TimeSheetWatcher.initiateWatch(watcherName);
    return {
        timesheet: TimeSheetWatcher.TimesheetCollection,
    }
})(TimesheetsTable);