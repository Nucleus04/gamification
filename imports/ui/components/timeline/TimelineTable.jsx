import React, { Component } from "react";
import TimelineRow from "./TimelineRow";
import TimelineWatcher from "../../../api/classes/client/TimelineWatcher/TimelineWatcher";
import { withTracker } from "meteor/react-meteor-data";

const NAME = "timeline"
class TimelineTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        TimelineWatcher.setWatcher(this, NAME);
    }
    async retrieveUsers() {
        await TimelineWatcher.retrieveMembers();
    }
    componentDidMount() {
        this.retrieveUsers();
    }
    showMore() {
        TimelineWatcher.retrieveMembers();
    }
    render() {
        return (
            <div className="ry_tablecontainer">
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
                                        <div>Project</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Mon</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Tue</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Wed</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Thu</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Fri</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-col _10">
                                <div className="rb-table-cell">
                                    <div className="table-header-div">
                                        <div>Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-content">

                            {
                                this.props.timeline.map((item) => {
                                    return (
                                        <TimelineRow key={item._id} details={item} date={this.props.date} />
                                    )
                                })
                            }
                            <div className="show-more" onClick={this.showMore.bind(this)}>Show More</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    TimelineWatcher.initiateWatch(NAME);
    return {
        timeline: TimelineWatcher.TimelineCollection.find({}).fetch(),
    }
})(TimelineTable);