import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";

ChartJS.register(ArcElement, Tooltip, Legend);

class GoalsCard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            data: {
                labels: ['Achieved', 'Deffered', 'In progress',],
                datasets: [
                    {
                        label: 'Goals percentage',
                        data: [],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(251, 176, 59, 0.2)',
                            // 'rgba(54, 162, 235, 0.2)',


                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                            // 'rgba(54, 162, 235, 1)',
                            // 'rgba(255, 206, 86, 1)',
                            // 'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            percentage: {
                achieved: 0,
                deffered: 0,
                inprogress: 0,
            }
        }
    }

    async retrieveGoals(filter) {
        let result = await DashboardWatcher.retrieveGoals(filter);
        this.setState({
            percentage: {
                achieved: result.achieved,
                deffered: result.deffered,
                inprogress: result.inprogress,
            },
            data: {
                ...this.state.data, // Keep other properties of the data object
                datasets: [
                    {
                        ...this.state.data.datasets[0], // Keep other properties of the first dataset
                        data: [result.achieved, result.deffered, result.inprogress], // Update data array
                    },
                ],
            },
        });
    }
    componentDidMount() {
        this.retrieveGoals();
    }
    handleFilterChoose(event) {

        this.retrieveGoals(event.target.value);
    }
    render() {
        return (
            <div className="card_dashboard">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="card_dashboard-label">Goals</div>
                            <div><select id="field-2" name="field-2" data-name="Field 2" onChange={this.handleFilterChoose.bind(this)}
                                className="ry_selectfieldsmall w-select">
                                <option value={null} >Today</option>
                                <option value="yesterday" >Yesterday</option>
                                <option value="month" >Last 30 days</option>
                            </select></div>
                        </div>
                        <div className="ry_cardcontent-style2">
                            <div className="ry_cardcontent-style2_left">
                                <div className="ry_productivitylabel_container">
                                    <div className="ry_productivitylabel">
                                        <div className="div-block-391"></div>
                                        <h1 className="ry_h3-display1 weight-semibold">{this.state.percentage.achieved ? `${this.state.percentage.achieved}%` : "0%"}</h1>
                                    </div>
                                    <div className="ry_p-style1">Achieved</div>
                                </div>
                                <div className="ry_productivitylabel_container">
                                    <div className="ry_productivitylabel">
                                        <div className="div-block-391 bg-gray"></div>
                                        <h1 className="ry_h3-display1 weight-semibold">{this.state.percentage.deffered ? `${this.state.percentage.deffered}%` : "0%"}</h1>
                                    </div>
                                    <div className="ry_p-style1">Deferred</div>
                                </div>
                                <div className="ry_productivitylabel_container">
                                    <div className="ry_productivitylabel">
                                        <div className="div-block-391 bg-orange"></div>
                                        <h1 className="ry_h3-display1 weight-semibold">{this.state.percentage.inprogress ? `${this.state.percentage.inprogress}%` : "0%"}</h1>
                                    </div>
                                    <div className="ry_p-style1">In Progress</div>
                                </div>
                            </div>
                            <div className="ry_cardcontent-style2_right">
                                <div className="ry_piechart">
                                    <Doughnut data={this.state.data} />
                                </div>
                            </div>
                        </div>
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


export default GoalsCard;