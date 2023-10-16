import React, { Component } from "react";
import AttendanceWatcher from "../../../api/classes/client/AttendanceWatcher/AttendanceWatcher";



class LeaderboardsRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isLoading: false,
            name: "oooooooo",
            initial: "",
        }
    }

    async componentDidMount() {
        this.setState({
            isLoading: true,
        })
        let name = await AttendanceWatcher.retrieveNames(this.props.item.userId);
        this.setState({
            name: name[0].firstname + " " + name[0].lastname,
            initial: name[0].firstname.charAt(0),
            isLoading: false,
        })
    }

    render() {
        return (
            <div className="ry_cardcontent_row">
                <div className="ry_cardcontent_rowcol">
                    <div className={`ry_person-style2 profile-text ${this.state.initial} ${this.state.isLoading ? "skeleton" : ""}`}>{this.state.initial}</div>
                    <p className={`ry_p-style1 mb-0 ${this.state.isLoading ? "skeleton" : ""}`}>{this.state.name}</p>
                </div>
                <div className="ry_cardcontent_rowcol _w-10">
                    <p className="ry_p-style1 mb-0 text-darkblue">{this.props.item.highest_point}</p>
                </div>
            </div>
        )
    }
}

export default LeaderboardsRow;