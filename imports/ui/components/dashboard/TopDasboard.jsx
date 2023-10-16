import React, { Component } from "react";
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";

class TopDashboard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            time: null,
            timezone: null,
            profile: "",
            invoiceAmount: null,
            nextPaymentDate: null,
            members: null,
        }
    }
    updateTime(timezone) {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: timezone, // Specify the target timezone here
        });

        this.setState({
            time: formattedTime,
            timezone: timezone,
        });
    }

    /**
     * Retreive profile information
     */
    async retriveProfile() {
        await DashboardWatcher.retrieveProfile();
        this.retreiveTotalMembers();
        this.setState({
            profile: DashboardWatcher.getProfile,
        });
        setInterval(() => {
            this.updateTime(DashboardWatcher.getProfile[0].timezone);
        }, 1000);

    }

    /**
     * Retreive total members on the team
     */
    async retreiveTotalMembers() {
        let members = await DashboardWatcher.retrieveTotalMembers();
        this.setState({
            members: members,
        })
    }

    async retrieveInvoiceHistory() {
        let invoice = await DashboardWatcher.retreiveInvoiceHistory();
        this.setState({
            invoiceAmount: invoice.amount,
            nextPaymentDate: invoice.date,
        })
        // function convertTimeToTimeZone(time, fromTimeZone, toTimeZone) {
        //     const fromDateTime = new Date(time.toLocaleString('en-US', { timeZone: fromTimeZone }));
        //     const toDateTime = new Date(fromDateTime.toLocaleString('en-US', { timeZone: toTimeZone }));
        //     return toDateTime;
        // }
        // const currentTime = new Date(); // Current time in the default time zone
        // const newTimeZone = 'Asia/Tokyo'; // Target time zone
        // const convertedTime = convertTimeToTimeZone(currentTime, 'UTC', newTimeZone);
        // this.setState({
        //     timezone: convertedTime.toTimeString(),
        // })
    }

    async componentDidMount() {
        const currentTime = new Date();

        this.retriveProfile();
        this.retrieveInvoiceHistory();

        // this.setState({
        //     timezone: Intl.DateTimeFormat('en', { timeZoneName: 'long' }).formatToParts(currentTime)
        //         .find(part => part.type === 'timeZoneName').value,
        // })
    }


    render() {
        return (
            <div className="ry_dashboard_top dashboard">
                <div className="ry_breadcrumbs_container"><a href="#" className="ry_breadcrumbs-style1">Dashboard</a>
                    <div className="ry_breadcrumbsdivider">/</div><a href="#"
                        className="ry_breadcrumbs-style1">Overview</a>
                </div>
                <div className="ry_headercontainer">
                    <h1 className="ry_h1-display1 text-white">Welcome back, {this.state.profile ? this.state.profile[0].firstname : ""}</h1>
                    {/* <div className="ry_emoji"><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647efb9d58835441406b1e5f_happy-face.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 27vw, (max-width: 767px) 9vw, (max-width: 1439px) 50px, (max-width: 1919px) 3vw, 50px"
                        srcSet="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647efb9d58835441406b1e5f_happy-face-p-500.png 500w, https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647efb9d58835441406b1e5f_happy-face.png 512w"
                        alt="" /></div> */}
                </div>
                <div className="dashboard_top-card_container mobile-vertical">
                    <div className="card_dashboard_top mobile-100">
                        <div className="card_dashboard_top-left">
                            <div className={`ry_person-style1 profile-text ${this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}`}>
                                {this.state.profile ? this.state.profile[0].firstname.charAt(0) : ""}
                            </div>
                            <div className="div-block-382">
                                <h1 className="ry_h3-display1">{this.state.profile ? this.state.profile[0].firstname + " " + this.state.profile[0].lastname : ""}</h1>
                                <div className="div-block-383">
                                    <div className="ry_iconsmall"><img
                                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f879562c8b340dc502_icon_person.svg"
                                        loading="lazy" alt="" /></div>
                                    <div className="ry_p-style1">{this.state.profile ? this.state.profile[0].team : ""}</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-dashboard_top-right">
                            <h1 className="ry_h3-display1 weight-semibold">{this.state.time}</h1>
                            <div className="ry_p-style1">{this.state.timezone}</div>
                        </div>
                    </div>
                    <div className="card_dashboard_top mobile-100">
                        <div className="card_dashboard_top-left">
                            <div className="div-block-382">
                                <h1 className="card_data">{this.state.members}</h1>
                                <div className="ry_p-style1">Members</div>
                            </div>
                        </div>
                        <div className="card_dashboard_top-left flex-vertical">
                            <h1 className="ry_h3-display1 weight-semibold">${this.state.invoiceAmount}</h1>
                            <div className="ry_p-style1">Last Invoice</div>
                        </div>
                        <div className="card-dashboard_top-right">
                            <h1 className="ry_h3-display1 weight-semibold">{this.state.nextPaymentDate}</h1>
                            <div className="ry_p-style1">Next Payment on</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TopDashboard