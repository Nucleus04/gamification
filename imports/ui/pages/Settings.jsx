import React, { Component } from "react";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import SettingsForm from "../components/settings/SettingsForm";
class Settings extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            firstname: "",
            lastname: "",
            timezone: "",
        }
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
                    <div class="ry_main-style1">
                        <div class="ry_main-style1_container">
                            <div class="section-style1 mt-0">
                                <div class="ry_dashboard_top mb-10">
                                    <div class="ry_breadcrumbs_container mb-0"><a href="#" class="ry_breadcrumbs-style1">Settings</a>
                                        <div class="ry_breadcrumbsdivider">/</div><a href="#" class="ry_breadcrumbs-style1">Overview</a>
                                    </div>
                                    <div class="ry_headercontainer">
                                        <h1 class="ry_h1-display1 text-white">Settings</h1>
                                    </div>
                                </div>
                                <div class="ry_body pb-0">
                                    <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100"
                                        class="ry_tabs-style1 w-tabs">
                                        <div class="ry_tabsmenu-style1 w-tab-menu" role="tablist"><a data-w-tab="Tab 1"
                                            class="ry_tablink-style1 w-inline-block w-tab-link w--current" id="w-tabs-0-data-w-tab-0"
                                            href="#w-tabs-0-data-w-pane-0" role="tab" aria-controls="w-tabs-0-data-w-pane-0"
                                            aria-selected="true">
                                            <div>Profile Settings</div>
                                        </a><a data-w-tab="Tab 2" class="ry_tablink-style1 w-inline-block w-tab-link" tabindex="-1"
                                            id="w-tabs-0-data-w-tab-1" href="#w-tabs-0-data-w-pane-1" role="tab"
                                            aria-controls="w-tabs-0-data-w-pane-1" aria-selected="false">
                                                <div>Workspace</div>
                                            </a><a data-w-tab="Tab 3" class="ry_tablink-style1 w-inline-block w-tab-link" tabindex="-1"
                                                id="w-tabs-0-data-w-tab-2" href="#w-tabs-0-data-w-pane-2" role="tab"
                                                aria-controls="w-tabs-0-data-w-pane-2" aria-selected="false">
                                                <div>Features</div>
                                            </a><a data-w-tab="Tab 4" class="ry_tablink-style1 w-inline-block w-tab-link" tabindex="-1"
                                                id="w-tabs-0-data-w-tab-3" href="#w-tabs-0-data-w-pane-3" role="tab"
                                                aria-controls="w-tabs-0-data-w-pane-3" aria-selected="false">
                                                <div>Screenshots</div>
                                            </a><a data-w-tab="Tab 5" class="ry_tablink-style1 w-inline-block w-tab-link" tabindex="-1"
                                                id="w-tabs-0-data-w-tab-4" href="#w-tabs-0-data-w-pane-4" role="tab"
                                                aria-controls="w-tabs-0-data-w-pane-4" aria-selected="false">
                                                <div>Attendance</div>
                                            </a><a data-w-tab="Tab 6" class="ry_tablink-style1 w-inline-block w-tab-link" tabindex="-1"
                                                id="w-tabs-0-data-w-tab-5" href="#w-tabs-0-data-w-pane-5" role="tab"
                                                aria-controls="w-tabs-0-data-w-pane-5" aria-selected="false">
                                                <div>Leave</div>
                                            </a><a data-w-tab="Tab 7" class="ry_tablink-style1 w-inline-block w-tab-link" tabindex="-1"
                                                id="w-tabs-0-data-w-tab-6" href="#w-tabs-0-data-w-pane-6" role="tab"
                                                aria-controls="w-tabs-0-data-w-pane-6" aria-selected="false">
                                                <div>Tracker</div>
                                            </a></div>
                                        <div class="ry_tabscontent-style1 w-tab-content">
                                            <div data-w-tab="Tab 1" class="w-tab-pane w--tab-active" id="w-tabs-0-data-w-pane-0"
                                                role="tabpanel" aria-labelledby="w-tabs-0-data-w-tab-0">
                                                <div class="ry_settingscard">
                                                    <div data-current="Tab 1" data-easing="ease" data-duration-in="300"
                                                        data-duration-out="100" class="w-tabs">
                                                        <div class="ry_tabsmenu-style2 w-tab-menu" role="tablist"><a data-w-tab="Tab 1"
                                                            class="ry_tablink-style2 w-inline-block w-tab-link w--current"
                                                            id="w-tabs-1-data-w-tab-0" href="#w-tabs-1-data-w-pane-0" role="tab"
                                                            aria-controls="w-tabs-1-data-w-pane-0" aria-selected="true">
                                                            <div>General</div>
                                                        </a><a data-w-tab="Tab 2" class="ry_tablink-style2 w-inline-block w-tab-link"
                                                            tabindex="-1" id="w-tabs-1-data-w-tab-1" href="#w-tabs-1-data-w-pane-1"
                                                            role="tab" aria-controls="w-tabs-1-data-w-pane-1" aria-selected="false">
                                                                <div>Manage Passwords</div>
                                                            </a></div>
                                                        <div class="w-tab-content">
                                                            <div data-w-tab="Tab 1" class="w-tab-pane w--tab-active"
                                                                id="w-tabs-1-data-w-pane-0" role="tabpanel"
                                                                aria-labelledby="w-tabs-1-data-w-tab-0">
                                                                <SettingsForm />
                                                            </div>
                                                            <div data-w-tab="Tab 2" class="w-tab-pane" id="w-tabs-1-data-w-pane-1"
                                                                role="tabpanel" aria-labelledby="w-tabs-1-data-w-tab-1"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-w-tab="Tab 2" class="w-tab-pane" id="w-tabs-0-data-w-pane-1" role="tabpanel"
                                                aria-labelledby="w-tabs-0-data-w-tab-1"></div>
                                            <div data-w-tab="Tab 3" class="w-tab-pane" id="w-tabs-0-data-w-pane-2" role="tabpanel"
                                                aria-labelledby="w-tabs-0-data-w-tab-2"></div>
                                            <div data-w-tab="Tab 4" class="w-tab-pane" id="w-tabs-0-data-w-pane-3" role="tabpanel"
                                                aria-labelledby="w-tabs-0-data-w-tab-3"></div>
                                            <div data-w-tab="Tab 5" class="w-tab-pane" id="w-tabs-0-data-w-pane-4" role="tabpanel"
                                                aria-labelledby="w-tabs-0-data-w-tab-4"></div>
                                            <div data-w-tab="Tab 6" class="w-tab-pane" id="w-tabs-0-data-w-pane-5" role="tabpanel"
                                                aria-labelledby="w-tabs-0-data-w-tab-5"></div>
                                            <div data-w-tab="Tab 7" class="w-tab-pane" id="w-tabs-0-data-w-pane-6" role="tabpanel"
                                                aria-labelledby="w-tabs-0-data-w-tab-6"></div>
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

export default Settings;