import React, { Component } from "react";
import ActivityRow from "./ActivityRow";
import { withTracker } from "meteor/react-meteor-data";
import ActivityWatcher from "../../../api/classes/client/ActivityWatcher/ActivityWatcher";

const NAME = 'activity';
class ActivityTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        ActivityWatcher.setWatcher(this, NAME)
    }
    async retrieveActivityTable() {
        ActivityWatcher.retrieveUsers();
    }
    componentDidMount() {
        this.retrieveActivityTable();
    }
    showMore() {
        ActivityWatcher.retrieveUsers();
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
                                        <div>Average</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rb-table-content">

                            {
                                this.props.activity.map((item) => {
                                    if (this.props.filter) {
                                        if (item.project === this.props.filter) {
                                            return (
                                                <ActivityRow key={item._id} details={item} />
                                            )
                                        }
                                    } else {
                                        return (
                                            <ActivityRow key={item._id} details={item} />
                                        )
                                    }
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
    ActivityWatcher.initiateWatch(NAME);
    return {
        activity: ActivityWatcher.ActivityUser,
    }
})(ActivityTable)