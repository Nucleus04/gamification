import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import TopSummary from "../components/rerports/TopSummary";
import ProductivityCard from "../components/dashboard/Productivity";
import GoalsCard from "../components/dashboard/GoalsCard";
import TopMembersCard from "../components/dashboard/TopMembersCard";


class Insight extends Component {
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
                                        <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Productivity</a>
                                            <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Insights</a>
                                        </div>
                                        <div className="ry_headercontainer">
                                            <h1 className="ry_h1-display1 text-white">Insights</h1>
                                        </div>
                                    </div>
                                    <div className="ry_body pb-0">
                                        <TopSummary />
                                        <div className="ry_bodycontainer flex-vertical">
                                            <div className="card_row_container">
                                                <TopMembersCard />
                                                <ProductivityCard />
                                            </div>
                                            <div className="card_row_container">

                                                <GoalsCard />
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



export default Insight;