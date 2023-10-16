import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,

);
class AccountabilityBarGraph extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            barchart: {
                labels: ['Self', 'Manager', 'Direct Reports'],
                datasets: [
                    {
                        label: 'Result',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                        hoverBorderColor: 'rgba(75, 192, 192, 1)',
                        data: [65, 59, 80],
                    },
                    {
                        label: 'Comparison',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                        hoverBorderColor: 'rgba(255, 99, 132, 1)',
                        data: [45, 75, 90],
                    },
                ],
            },
            baroption: {
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderWidth: 2,
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Horizontal Bar Chart',
                    },
                },
            },
            feedbackDetails: null

        }
    }
    componentDidUpdate(prevProps) {
        let directReport = 0.0, Manager = 0.0, self = 0.0;
        let numberOfSurvey = 0;
        if (prevProps.feedbacks !== this.props.feedbacks) {
            this.props.feedbacks[0].reviews.forEach(element => {

                if (element.status === "done") {
                    self = self + element.accountability.self;
                    Manager = Manager + element.accountability.manager;
                    directReport = directReport + element.accountability.direct_reports;
                    numberOfSurvey += 1;
                }
            });

            directReport = directReport / numberOfSurvey;
            Manager = Manager / numberOfSurvey;
            self = self / numberOfSurvey;
            const newData = [parseFloat(self).toFixed(2), parseFloat(Manager).toFixed(2), parseFloat(directReport).toFixed(2)];
            this.setState((prevState) => ({
                barchart: {
                    ...prevState.barchart,
                    datasets: [
                        {
                            ...prevState.barchart.datasets[0], // Keep the other properties of the first dataset unchanged
                            data: newData, // Update the data property with the new data
                        },
                        ...prevState.barchart.datasets.slice(1), // Keep the other datasets unchanged
                    ],
                },
            }));
        }

        if (prevProps.feedbacks !== this.props.feedbacks) {
            this.props.feedbacks[1].reviews.forEach(element => {

                if (element.status === "done") {
                    self = self + element.accountability.self;
                    Manager = Manager + element.accountability.manager;
                    directReport = directReport + element.accountability.direct_reports;
                    numberOfSurvey += 1;
                }
            });

            directReport = directReport / numberOfSurvey;
            Manager = Manager / numberOfSurvey;
            self = self / numberOfSurvey;
            const newData = [parseFloat(self).toFixed(2), parseFloat(Manager).toFixed(2), parseFloat(directReport).toFixed(2)];
            this.setState((prevState) => ({
                barchart: {
                    ...prevState.barchart,
                    datasets: [
                        ...prevState.barchart.datasets.slice(0, 1),
                        {
                            ...prevState.barchart.datasets[1], // Keep the other properties of the first dataset unchanged
                            data: newData, // Update the data property with the new data
                        },
                        // Keep the other datasets unchanged
                    ],
                },
            }));
        }
    }
    render() {
        return (
            <div className="ry_review flex-vertical">
                <div className="ry_cardtop">
                    <div className="card_dashboard-label">Accountability</div>
                </div>
                <div className="ry_barchart">
                    <Bar data={this.state.barchart} options={this.state.baroption} />
                </div>
            </div>
        )
    }
}


export default AccountabilityBarGraph;
