import React, { Component } from "react";


class ReviewAddFilterButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleAddReview() {

    }
    render() {
        return (
            <div className="ry_bodytop_right"><a href="#"
                className="ry_icon-btn-style1 light mr-10 w-inline-block"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                    loading="lazy" alt="" className="icon-btn_asset" />
                <div>Filter</div>
            </a><button data-w-id="8232ce11-9743-edb8-96ba-6624a1340167" onClick={this.handleAddReview.bind(this)}
                className="ry_icon-btn-style1 w-inline-block"><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                        loading="lazy" alt="" className="icon-btn_asset" />
                    <div>Add</div>
                </button></div>
        )
    }
}


export default ReviewAddFilterButton;