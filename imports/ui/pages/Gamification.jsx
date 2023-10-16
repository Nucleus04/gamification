import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import GamifiedTopCards from "../components/Gamification/GamifiedTopCards";
import ExchangeCenter from "../components/Gamification/ExchangeCenter";
import Leaderboards from "../components/Gamification/Leaderboards";
import "../stylesheet/Rewards.css";
import ExchangeRequest from "../components/Gamification/ExchangeRequest";
import RedeemCenter from "../components/Gamification/RedeemCenter";
import RewardsInventory from "../components/Gamification/RewardsInventory";

class Gamification extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    render() {
        return (
            <div className="ry_app-main-wrapper-style2">
                <div data-w-id="ac3afbcf-65d0-1e1e-7bef-fe7812f0d460" className="icon_main-menu"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg"
                    loading="lazy" alt="" /></div>
                <Header />
                <div className="ry_main-section-style1">
                    <Menu />
                    <div className="ry_main-style1">
                        <div className="ry_main-style1_container">
                            <div className="section-style1 mt-0">
                                <div className="ry_dashboard_top mb-10">
                                    <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Gamification</a>
                                        <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Overview</a>
                                    </div>
                                    <div className="ry_headercontainer">
                                        <h1 className="ry_h1-display1 text-white">Rewards</h1>
                                    </div>
                                </div>
                                <div className="ry_body pb-0">
                                    <GamifiedTopCards />
                                    <div className="ry_bodycontainer flex-vertical">

                                        <div className="ry_bodycontainer">

                                        </div>
                                    </div>


                                    <div className="ry_body pb-0">
                                        {/* <div className="ry_bodytop">
                                            <div className="ry_bodytop_left">
                                                <h1 className="ry_h2-display1">All Goals</h1>
                                            </div>
                                            <div className="ry_bodytop_right"><a data-w-id="bfd1bb1a-b812-55c4-35f4-30b7f4515628"
                                                className="ry_icon-btn-style1 w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                <div>Add</div>
                                            </a></div>
                                        </div> */}
                                        <div className="ry_bodycontainer">
                                            <div className="ry_bodycontainer_left">
                                                <ExchangeRequest />
                                                <RedeemCenter />
                                            </div>
                                            <div className="ry_bodycontainer_right">
                                                <ExchangeCenter />
                                                <Leaderboards />
                                                <RewardsInventory />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default Gamification;