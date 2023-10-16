import React, { Component } from "react";
import ReviewWatcher from "../../../api/classes/client/ReviewWatcher/ReviewWatcher";
import "../../stylesheet/ReviewItem.css";

class ReviewItem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            comments: [],
            showComment: false,
            comment: "",
        }
    }
    handleLike() {
        ReviewWatcher.addLike(this.props.details._id);
    }
    async retreiveTotalComments() {
        let commentCount = await ReviewWatcher.countTotalComment(this.props.details._id);
        this.setState({
            comments: commentCount,
        })
    }
    showComment() {
        this.setState({
            showComment: !this.state.showComment,
        })
    }
    componentDidMount() {
        this.retreiveTotalComments();
    }
    handleCommentChange(event) {
        this.setState({
            comment: event.target.value
        })
    }
    async handleSubmitComment() {
        this.setState({
            comment: "",
        })
        await ReviewWatcher.addComment(this.state.comment, this.props.details._id);
        this.retreiveTotalComments();
    }
    render() {
        return (
            <div className="ry_review">
                <div className="ry_reviewleft">
                    <div className={`ry_person-style2 small profile-text ${this.props.details ? this.props.details.reviewer.name.charAt(0) : ""}`}>{this.props.details ? this.props.details.reviewer.name.charAt(0) : ""}</div>
                    <div className={`ry_person-style2 small profile-text ${this.props.details ? this.props.details.reviewee.name.charAt(0) : ""}`}>{this.props.details ? this.props.details.reviewee.name.charAt(0) : ""}</div>
                </div>
                <div className="ry_reviewright">
                    <div className="ry_reviewrighttop">
                        <p className="ry_p-style1 mb-0 text-darkblue text-semibold">{this.props.details ? this.props.details.reviewer.name : ""} to {this.props.details ? this.props.details.reviewee.name : ""}</p>
                        <p className="ry_p-style2">{this.props.date}</p>
                    </div>
                    <p className="ry_p-style1"><strong>@{this.props.details ? this.props.details.reviewee.name : ""}</strong> {this.props.details ? this.props.details.message : ""}</p>
                    <div>
                        <div className="ry_reviewrightbottom">
                            <div className="ry_reviewmicro">
                                <div className="ry_reviewmicro_icon" onClick={this.handleLike.bind(this)}><img
                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7d23b0d34b9eb8af1b_review_01.svg"
                                    loading="lazy" alt="" /></div>
                                <div>{this.props.details ? this.props.details.likes : ""}</div>
                            </div>
                            <div className="ry_reviewmicro" onClick={this.showComment.bind(this)}>
                                <div className="ry_reviewmicro_icon"><img
                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7ec8d98bb32195c8ea_review_02.svg"
                                    loading="lazy" alt="" /></div>
                                <div>{this.state.comments.length}</div>
                            </div>


                        </div>
                        <br />

                        <div className={`comment-container ${this.state.showComment ? "" : "display-none"}`}>
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
                                        <div key={item._id} >
                                            <div className="commentItem">
                                                <p><b>{item.commentator}</b></p>

                                                <p>{item.message}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ReviewItem;