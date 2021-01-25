import React, { Component } from "react";
import axios from 'axios';
import Chart from 'chart.js';


export class energy_consumption extends Component {
    barPlotData = {
        data: {
            labels: ['Sidste år', 'Sidste måned', 'Sidste uge', 'I dag'],
            datasets: [{
              label: 'Vindmølle energi produktion',
              data: [2, 10, 20, 1],
              backgroundColor: "rgba(30, 99, 71, 0.5)"
            }, {
              label: 'Solcelle energi produktion',
              data: [1, 5, 10, 0.5],
              backgroundColor: 'rgba(255, 228, 0, 0.5)'  
            }
          ]
        },
        options : {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + " %";
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }]
            }
        }
    }

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            barPlotData: this.barPlotData,
            powerData: null,
            sqlURL: 'https://www.energidataservice.dk/proxy/api/datastore_search_sql?sql='
        }
      }

    
    
    getDataFromElOverblik(number_days, idx) {
        const query = 'SELECT SUM("SolarPower") AS SolarPower, SUM("TotalLoad") AS TotalLoad, SUM("OffshoreWindPower") AS Offshore, SUM("OnshoreWindPower") AS Onshore FROM (SELECT * from "electricitybalancenonv" ORDER BY "HourDK" DESC LIMIT ' + number_days + ') AS subquery' 
        return axios.get(this.state.sqlURL + query, 
            {
                crossDomain: true
            }
        )
        .then(res => {
            const data = res.data.result.records[0];
            var wind_percent = ((data["offshore"] + data["onshore"])/data["totalload"]*100).toFixed(2);
            var solar_percent = (data["solarpower"]/data["totalload"]*100).toFixed(2);
            this.barPlotData.data.datasets[0].data[idx] = wind_percent;
            this.barPlotData.data.datasets[1].data[idx] = solar_percent;
        }).catch(err => console.log(err));
    }

    setupBarChart() {
        console.log("Bar chart");
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: this.state.barPlotData.data,
            options: this.state.barPlotData.options
        });
    }

    async setupPowerData() {
        var year = 365*24*2;
        var month = 30*24*2;
        var week = 7*24*2;
        var day = 1*24*2;
        
        await this.getDataFromElOverblik(day, 3);
        await this.getDataFromElOverblik(week, 2);
        await this.getDataFromElOverblik(month, 1);
        await this.getDataFromElOverblik(year, 0);

        this.setupBarChart();
    }


    componentDidMount() {
        this.setupPowerData(); 
    }
    
    render() {
    return (
    <div id="energy_dk" className="text-center">
        <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Danmarks energi</h2>
            <p>{this.props.data ? this.props.data.paragraph : 'loading...'}</p>
            <canvas ref={this.chartRef} />
            <div style={{textAlign: this.props.someBoolean ? "center" : "left"}}> 
                <p>{this.props.data ? this.props.data.source : 'loading..'} </p>
            </div>
        </div>
        </div>
    </div>
    );
    }
}

export default energy_consumption;