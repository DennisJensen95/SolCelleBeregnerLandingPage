import React, { Component } from "react";
// import axios from 'axios';
import Chart from 'chart.js';


export class energy_consumption extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
      }

    state = {
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

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
          type: 'bar'
        });
      }
    
    render() {
    return (
    <div id="energy_dk" className="text-center">
        <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Beregner er under udvikling</h2>
            <canvas ref={this.chartRef} />
        </div>
        </div>
    </div>
    );
    }
}

export default energy_consumption;