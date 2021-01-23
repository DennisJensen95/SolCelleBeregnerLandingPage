import React, { Component } from "react";
// import axios from 'axios';
import Chart from 'chart.js';


export class energy_consumption extends Component {


    state = {
        data: {
            datasets: [{
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: [10, 20, 30, 40, 50, 60, 70]
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true
                    }
                }]
            }
        },
        daily_numbers: [
            {
                "label": "Energy spend",
                "value": 1000
            },
            {
                "label": "Green energy amount",
                "value": 800
            }
        ],
        monthly_numbers: {monthly_energy: 800, monthly_solar_energy: 100}
    }

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
      }

    

    componentDidMount() {
        console.log(this.state.daily_numbers)
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
              labels: ['Sidste år', 'Sidste måned', 'Sidste uge', 'I dag'],
              datasets: [{
                label: 'Sort energi',
                data: [10, 50, 100, 5],
                backgroundColor: "rgba(0, 2, 0, 0.5)"
              }, {
                label: 'Vindmølle energi produktion',
                data: [2, 10, 20, 1],
                backgroundColor: "rgba(30, 99, 71, 0.5)"
              }, {
                label: 'Solcelle energi produktion',
                data: [1, 5, 10, 0.5],
                backgroundColor: 'rgba(255, 228, 0, 0.5)'  
              }
            ]
            }
        });
      }
    
    render() {
    return (
    <div id="energy_dk" className="text-center">
        <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Danmarks energi</h2>
            <p>{this.props.data ? this.props.data.paragraph : 'loading...'}</p>
            <canvas ref={this.chartRef} />
        </div>
        </div>
    </div>
    );
    }
}

export default energy_consumption;