import React, { Component } from "react";
import BonusRow from "./BonusRow";
import BonusesWatcher from "../../../api/classes/client/BonusesWatcher/BonusesWatcher";
import { withTracker } from "meteor/react-meteor-data";
import "../../stylesheet/ReviewItem.css";
class BonusTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            bonusList: [],
        }

    }

    async retrieveBonus() {
        let list = await BonusesWatcher.retreiveBonuses();
        this.setState({
            bonusList: list,
        })

    }
    componentDidMount() {
        this.retrieveBonus();
    }

    showMore() {
        BonusesWatcher.retreiveBonuses();
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
                                    <div>Earned ($)</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col stretch">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Message</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _15">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Status</div>
                                </div>
                            </div>
                        </div>
                        <div className="rb-table-col _15">
                            <div className="rb-table-cell">
                                <div className="table-header-div">
                                    <div>Date Released</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rb-table-content">
                        {
                            this.props.bonuses.map((item) => {
                                const date = new Date(item.date);

                                // Define an array of month names
                                const monthNames = [
                                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                ];

                                // Get the month, day, and year from the Date object
                                const month = monthNames[date.getMonth()];
                                const day = date.getDate();
                                const year = date.getFullYear();

                                // Create the formatted date string
                                const formattedDate = `${month} ${day}, ${year}`;
                                return (
                                    <BonusRow details={item} key={item._id} date={formattedDate} />
                                )
                            })
                        }
                        <div className="show-more" onClick={this.showMore.bind(this)}>Show More</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    return {
        bonuses: BonusesWatcher.minimongoBonus.find({}).fetch(),
    }
})(BonusTable);