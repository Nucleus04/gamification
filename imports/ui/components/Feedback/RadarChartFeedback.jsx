import React, { Component } from "react";
import { Radar, Bar } from "react-chartjs-2";
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

class RadarChartFeedback extends Component {
    constructor(parent) {
        super(parent);
        this.state = {
            data: {
                labels: ['Communication', 'Teamwork', 'Integrity', 'Accountability'],
                datasets: [
                    {
                        label: 'Summary',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                        data: [],
                    },
                ],
            },
            options: {
                scale: {
                    ticks: { beginAtZero: true },
                    stepSize: 1,
                    max: 10,
                    min: 1
                },
            },
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.feedbacks !== this.props.feedbacks) {
            const { communication, integrity, accountability, teamwork } = this.props.feedbacks;
            const newData = [communication, teamwork, integrity, accountability];
            this.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    datasets: [
                        {
                            ...prevState.data.datasets[0],
                            data: newData,
                        },
                        ...prevState.data.datasets.slice(1),
                    ],
                },
            }));
        }

        if (prevProps.feedbacksOld !== this.props.feedbacksOld) {
            const { communication, integrity, accountability, teamwork } = this.props.feedbacksOld;
            const newData = [communication, teamwork, integrity, accountability];
            this.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    datasets: [
                        ...prevState.data.datasets.slice(0, 1),
                        {
                            ...prevState.data.datasets[1],
                            data: newData,
                        },
                    ],
                },
            }));
        }


    }
    render() {
        return (
            <div className="ry_barchart">
                <Radar data={this.state.data} options={this.state.options} />
            </div>
        )
    }
}


export default RadarChartFeedback;