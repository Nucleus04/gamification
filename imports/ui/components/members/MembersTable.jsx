import React, { Component } from "react";
import MemberWathcer from "../../../api/classes/client/MembersWatcher/MemberWathcer";
import MembersItem from "./MembersItem";
class MembersTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            members: [],
        }
    }
    async retrieveMembers() {
        let members = await MemberWathcer.retrieveMembers();
        this.setState({
            members: members,
        })
    }
    componentDidMount() {
        this.retrieveMembers();
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
                        <div className="rb-table-col _10">
                            <div className="rb-table-cell"></div>
                        </div>
                    </div>
                    <div className="rb-table-content">


                        {
                            this.state.members.map((item) => {
                                return (
                                    <MembersItem details={item} key={item._id} />
                                )
                            })
                        }




                    </div>
                </div>
            </div>
        )
    }
}


export default MembersTable;