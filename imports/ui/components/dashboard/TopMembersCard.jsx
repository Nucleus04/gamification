import React, { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class TopMembersCard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            chartData: {
                labels: ["Member 1", "Member 2", "Member 3", "Member 4", "Member 5"],
                datasets: [
                    {
                        label: "Performance",
                        data: [], // Sample performance values
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        };
    }
    async retrieveTopMember() {
        let result = await DashboardWatcher.retrieveTopMember();

        // Extract labels and data from the result
        const labels = result.map((item) => item.name); // Assuming 'name' is the label field
        const data = result.map((item) => item.rating); // Assuming 'rating' is the data field

        // Update the chartData state
        this.setState({
            chartData: {
                labels: labels,
                datasets: [
                    {
                        label: "Performance",
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });

    }
    componentDidMount() {
        this.retrieveTopMember();
    }
    render() {
        return (
            <div className="card_dashboard _w-66">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="card_dashboard-label">Top Members</div>
                            <div><select id="field-3" name="field-3" data-name="Field 3"
                                className="ry_selectfieldsmall w-select">
                                <option value="">Today</option>
                                <option value="First">First choice</option>
                                <option value="Second">Second choice</option>
                                <option value="Third">Third choice</option>
                            </select></div>
                        </div>
                        <div className="ry_barchart"><Bar
                            data={this.state.chartData}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    title: {
                                        display: true,
                                        text: "Top Members Performance",
                                    },
                                },
                            }}
                        /></div>
                    </form>
                    <div className="w-form-done" tabIndex="-1" role="region"
                        aria-label="Email Form 2 success">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail" tabIndex="-1" role="region"
                        aria-label="Email Form 2 failure">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TopMembersCard;