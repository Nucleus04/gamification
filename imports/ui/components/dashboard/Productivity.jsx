import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DashboardWatcher from "../../../api/classes/client/DashboardWatcher/DashboardWatcher";

ChartJS.register(ArcElement, Tooltip, Legend);


class ProductivityCard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            data: {
                labels: ['Productive', 'Neutral', 'Non Productive',],
                datasets: [
                    {
                        label: 'productivity percentage',
                        data: [],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
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
                productive: 0,
                neutral: 0,
                nonproductive: 0,
            }
        }
    }
    async retrieveProductivity(filter) {
        let result = await DashboardWatcher.retrieveProductivity(filter);
        this.setState({
            percentage: {
                productive: result.productive,
                neutral: result.neutral,
                nonproductive: result.nonproductive,
            },
            data: {
                ...this.state.data, // Keep other properties of the data object
                datasets: [
                    {
                        ...this.state.data.datasets[0], // Keep other properties of the first dataset
                        data: [result.productive, result.neutral, result.nonproductive], // Update data array
                    },
                ],
            },
        });

    }
    componentDidMount() {
        this.retrieveProductivity(null)
    }

    handleFilterChoose(event) {
        this.retrieveProductivity(event.target.value);
    }
    render() {
        return (
            <div className="card_dashboard">
                <div className="w-form">
                    <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get"
                        aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="card_dashboard-label">Productivity</div>
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
                                        <h1 className="ry_h3-display1 weight-semibold">{`${this.state.percentage.productive ? this.state.percentage.productive : "0"}%`}</h1>
                                    </div>
                                    <div className="ry_p-style1">Productivity</div>
                                </div>
                                <div className="ry_productivitylabel_container">
                                    <div className="ry_productivitylabel">
                                        <div className="div-block-391 bg-gray"></div>
                                        <h1 className="ry_h3-display1 weight-semibold">{`${this.state.percentage.neutral ? this.state.percentage.neutral : "0"}%`}</h1>
                                    </div>
                                    <div className="ry_p-style1">Neutral</div>
                                </div>
                                <div className="ry_productivitylabel_container">
                                    <div className="ry_productivitylabel">
                                        <div className="div-block-391 bg-red"></div>
                                        <h1 className="ry_h3-display1 weight-semibold">{`${this.state.percentage.nonproductive ? this.state.percentage.nonproductive : "0"}%`}</h1>
                                    </div>
                                    <div className="ry_p-style1">Non- Productive</div>
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


export default ProductivityCard;