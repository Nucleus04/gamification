import React, { Component } from "react";
import GoalsWatcher from "../../../api/classes/client/GoalsWatcher/GoalsWatcher";
import "../../stylesheet/GoalsItem.css";
import { withTracker } from "meteor/react-meteor-data";
import { ADMIN, SESSION_KEYS } from "../../../api/common";

const name = "goals"
class GoalsItem extends Component {
    constructor(props) {
        super(props);
        GoalsWatcher.setWatcher(this, name)
        this.props = props;
        this.state = {
            comments: [],
            showComments: false,
            comment: "",
            showOptions: false,
            pointsOfThisTask: 0,
            profile: "",
        }
    }
    async retrieveComments() {
        let comments = await GoalsWatcher.retrieveComment(this.props.details._id);
        this.setState({
            comments: comments,
        })
    }
    showComments() {
        this.setState({
            showComments: !this.state.showComments,
        })
    }
    calculateTotalPoints() {
        let startDate = new Date(this.props.details.created_at);
        let dueDate = this.props.details.due_date ? new Date(this.props.details.due_date) : new Date();
        const timeDifferenceMs = dueDate - startDate;
        const timeDifferenceHours = timeDifferenceMs / 3600000;
        let point = this.props.points.length > 0 ? Math.floor(timeDifferenceHours) * (this.props.points[0].point / this.props.points[0].hour) : 0;
        if (point < 0) {
            point = 0;
        }
        if (Math.floor(timeDifferenceHours) === 0 && point === 0) {
            point = this.props.points.length > 0 ? this.props.points[0].point : 0;
        }
        return Math.floor(point);
    }
    componentDidMount() {
        this.retrieveComments();
        this.calculateTotalPoints();
        let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
        this.setState({
            profile: profile[0],
        })
    }
    async handleSubmitComment() {
        await GoalsWatcher.addComment(this.state.comment, this.props.details._id)
        this.retrieveComments();
        this.setState({
            comment: "",
        })
    }
    handleCommentChange(event) {
        this.setState({
            comment: event.target.value,
        })
    }
    handleShowOptions() {
        this.setState({
            showOptions: !this.state.showOptions,
        })
    }
    async closeOptions() {
        this.setState({
            showOptions: false,
        })
    }
    async handleDeleteGoals() {
        await GoalsWatcher.deleteGoals(this.props.details._id);
    }

    async handleCompletedGoal() {
        GoalsWatcher.completeGoal(Meteor.userId(), this.calculateTotalPoints());
        GoalsWatcher.changeStatus(this.props.details._id);
    }
    render() {
        return (
            <div>
                <div className="ry_review">
                    <div className="ry_reviewleft">
                        <div className={`ry_goalsstatus ${this.props.details.status === "completed" ? "bg-green" : this.props.details.status === "ongoing" ? "bg-yellow" : this.props.details.status === "unstarted" ? "bg-skyblue" : ""}`}></div>
                    </div>
                    <div className="ry_reviewright flex-horizontal">
                        <div className="ry_reviewrighttop flex-vertical">
                            <p className="ry_p-style1 mb-0 text-darkblue text-semibold" onClick={() => this.props.onSelect(this.props.details, this.calculateTotalPoints())}>{this.props.details.goalTitle}</p>
                            <p className="ry_p-style2" onClick={() => this.props.onSelect(this.props.details, this.calculateTotalPoints())}>{this.props.details.due_date ? new Date(this.props.details.due_date).toDateString() : new Date().toDateString()} </p>
                            <div className="ry_reviewmicro mt-10">
                                <div className="ry_reviewmicro_icon" onClick={this.showComments.bind(this)}><img
                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7ec8d98bb32195c8ea_review_02.svg"
                                    loading="lazy" alt="" />
                                </div>
                                <div>{this.state.comments.length}</div>
                            </div>


                            <div className={`comment-container ${this.state.showComments ? "" : "display-none"}`} >
                                <div className="div-block-397"><input type="text" className="ry_text-field-style1 w-input" maxLength="256" onChange={this.handleCommentChange.bind(this)}
                                    name="name-2" placeholder="" required value={this.state.comment} /><a href="#" onClick={this.handleSubmitComment.bind(this)}
                                        className="ry_icon-btn-style1 bg-cyan w-inline-block"><img
                                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                            loading="lazy" alt="" className="icon-btn_asset" />
                                        <div>Add</div>
                                    </a></div>
                                {
                                    this.state.comments.map((item) => {
                                        return (
                                            <div key={Math.random()} className="commentItem">
                                                <div>
                                                    <p style={{ margin: "0" }}><b>{item.author}</b></p>
                                                    <p>{new Date(item.created_at).toDateString()}</p>
                                                    <p>{item.message}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="ry_reviewrightbottom flex-vertical" onClick={() => this.props.onSelect(this.props.details, this.calculateTotalPoints())}>
                            <h1 className="ry_h3-display1 text-violet">{this.props.details.percentage}%</h1>
                            <p className="ry_p-style2">{this.props.dayBeforeEnd > 0 ? `Ends in ${this.props.dayBeforeEnd} days` : `${Math.abs(this.props.dayBeforeEnd)} days behind`}</p>
                            <p className="ry_p-style2">Points to be earned: {this.calculateTotalPoints()}</p>
                            {
                                this.props.timeDifference < 0 ? <p style={{ color: "red", fontWeight: "700" }}>Overdue</p> : ""
                            }
                        </div>
                    </div>

                    {
                        this.state.profile.team === ADMIN ?
                            ("") :
                            (
                                <div className="ry_options"><img onClick={this.handleShowOptions.bind(this)}
                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                                    loading="lazy" alt="" />
                                    <div className={`goals-options-modal ${this.state.showOptions ? "" : "display-none widthhieght0"}`} >
                                        <span>
                                            {
                                                this.props.details.status !== "completed" ? <button className="bg-green goals-option-button" onClick={this.handleCompletedGoal.bind(this)}>Completed</button> : ""
                                            }
                                            <button className="bg-red goals-option-button" onClick={this.handleDeleteGoals.bind(this)}>Delete</button>
                                        </span>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    GoalsWatcher.initiateWatch(name);
    return {
        points: GoalsWatcher.Points,
    }
})(GoalsItem)