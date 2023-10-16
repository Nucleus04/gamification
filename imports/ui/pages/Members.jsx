import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import MembersTable from "../components/members/MembersTable";

class Members extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    render() {
        return (
            <div>
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
                                        <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">People</a>
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Members</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Members</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <div className="ry_bodytop">
                                            <div className="ry_bodytop_left">
                                                <h1 className="ry_h2-display1">All Members</h1>
                                                {/* <div className="ry_arrowdown"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg"
                                                    loading="lazy" alt="" /></div> */}
                                            </div>
                                            <div className="ry_bodytop_right"><a href="#" className="ry_icon-btn-style1 light mr-10 w-inline-block"><img
                                                src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                                loading="lazy" alt="" className="icon-btn_asset" />
                                                <div>Filter</div>
                                            </a>
                                                <a href="#" className="ry_icon-btn-style1 outline mr-10 w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef4270fda82b7c1c6f5e_icon_add-violet.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Bulk Invite</div>
                                                </a>
                                                <a href="#" className="ry_icon-btn-style1 mr-10 mobile-margin-10 w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Copy Invitation Link</div>
                                                </a>
                                                <a data-w-id="e133e949-6631-f791-28a0-1332afc12df0" href="#"
                                                    className="ry_icon-btn-style1 mr-10 w-inline-block"><img
                                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                                        loading="lazy" alt="" className="icon-btn_asset" />
                                                    <div>Add</div>
                                                </a>
                                                <a href="#" className="ry_icon-btn-style1 light square w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset mr-0" /></a></div>
                                        </div>
                                        <div className="ry_bodycontainer">
                                            <div className="ry_tablecontainer">
                                                <MembersTable />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Members;