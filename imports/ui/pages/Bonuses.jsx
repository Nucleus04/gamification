import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import BonusTable from "../components/bonuses/BonusesTable";
import BonusesWatcher from "../../api/classes/client/BonusesWatcher/BonusesWatcher";
import ReviewAddModal from "../components/review/ReviewAddModal";
import AddBonus from "../components/bonuses/AddBonus";


class Bonuses extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            showPrivacySelector: false,
            privacy: "Everyone",
            showfilters: false,
        }
    }

    handleChangePrivacy() {
        if (this.state.privacy === "Everyone") {
            this.setState({
                showPrivacySelector: false,
                privacy: "Me"
            })
            BonusesWatcher.setPrivacy("me")
        } else {
            this.setState({
                showPrivacySelector: false,
                privacy: "Everyone"
            })
            BonusesWatcher.setPrivacy("everyone")

        }
        BonusesWatcher.retreiveBonuses();
    }
    handleEveryone() {
        this.setState({
            showPrivacySelector: !this.state.showPrivacySelector,
        })
    }
    handleShowFilter() {
        this.setState({
            showfilters: !this.state.showfilters,
        })
    }
    retriveWithFilter(filter) {
        BonusesWatcher.retrieveBonusWithFilter(filter);
        this.setState({
            showfilters: false,
        })
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
                                    <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Bonus</a>
                                        <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Overview</a>
                                    </div>
                                    <div className="ry_headercontainer">
                                        <h1 className="ry_h1-display1 text-white">Bonus</h1>
                                    </div>
                                </div>
                                <div className="ry_body pb-0">
                                    <div className="ry_bodytop">
                                        <div className="ry_bodytop_left">
                                            <h1 className="ry_h2-display1">{this.state.privacy === "Everyone" ? "All" : "My"} Bonuses</h1>
                                            <div className="ry_arrowdown" onClick={this.handleEveryone.bind(this)}><img
                                                src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg"
                                                loading="lazy" alt="" /></div>
                                            <div className={`privacy-box ${this.state.showPrivacySelector ? "" : "display-none"}`} onClick={this.handleChangePrivacy.bind(this)}>{this.state.privacy === "Everyone" ? "Me" : "Everyone"}</div>
                                        </div>
                                        <div className="ry_bodytop_right"><button href="#" className="ry_icon-btn-style1 light mr-10 w-inline-block" onClick={this.handleShowFilter.bind(this)}><img
                                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg"
                                            loading="lazy" alt="" className="icon-btn_asset" />
                                            <div>Filter</div>
                                        </button>
                                            <div className={`filter-modal ${this.state.showfilters ? "" : "display-none"}`}>
                                                <div>
                                                    <div className="filter-item" onClick={() => this.retriveWithFilter(null)}>
                                                        All
                                                    </div>
                                                    <div className="filter-item" onClick={() => this.retriveWithFilter('released')} >
                                                        released
                                                    </div>
                                                    <div className="filter-item" onClick={() => this.retriveWithFilter('pending')} >
                                                        pending
                                                    </div>
                                                </div>
                                            </div>
                                            <a data-w-id="6dc26d81-ab1b-1162-95e2-e6f87988e689" href="#"
                                                className="ry_icon-btn-style1 w-inline-block"><img
                                                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                                    loading="lazy" alt="" className="icon-btn_asset" />
                                                <div>Add</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="ry_bodycontainer">
                                        <div className="ry_tablecontainer">
                                            <BonusTable />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <AddBonus /> */}
                    </div>
                </div>
            </div >
        )
    }
}


export default Bonuses;