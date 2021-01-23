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
                        }
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
            powerData: null
        }
      }

    
    
    getDataFromElOverblik() {
        axios.get("https://www.energidataservice.dk/proxy/api/datastore_search?resource_id=electricitybalancenonv&limit=8760", 
            {
                crossDomain: true
            }
        )
            .then(res => {
            const powerData = res.data;
            this.setState({powerData: powerData});
            this.calculatePercentagePower();
            this.myChart = new Chart(this.chartRef.current, {
                type: 'bar',
                data: this.state.barPlotData.data,
                options: this.state.barPlotData.options
            });
        })   
    }

    calculatePercentagePower() {
        const records = this.state.powerData.result.records;
        console.log(this.state.powerData)
        console.log(records);
        const day = 1*24;
        const week = 7*24;
        const month = 30*24;
        const year = 365*24;
        var total_consumption = 0;
        var total_windmill = 0;
        var total_solar = 0;
        for (var i=0; i < records.length; i++) {
            total_consumption += records[i].TotalLoad;
            total_windmill += records[i].OffshoreWindPower + records[i].OnshoreWindPower;
            total_solar += records[i].SolarPower;
            if (i+1 == day) {
                // this.state.barPlotData.data.datasets[0].data[3] = 100;
                this.state.barPlotData.data.datasets[0].data[3] = total_windmill/total_consumption*100;
                this.state.barPlotData.data.datasets[1].data[3] = total_solar/total_consumption*100;
            } else if (i+1 == week) {
                // this.state.barPlotData.data.datasets[0].data[2] = 100;
                this.state.barPlotData.data.datasets[0].data[2] = total_windmill/total_consumption*100;
                this.state.barPlotData.data.datasets[1].data[2] = total_solar/total_consumption*100;
            } else if (i+1 == month) {
                // this.state.barPlotData.data.datasets[0].data[1] = 100;
                this.state.barPlotData.data.datasets[0].data[1] = total_windmill/total_consumption*100;
                this.state.barPlotData.data.datasets[1].data[1] = total_solar/total_consumption*100;
            } else if (i+1 == year) {
                // this.state.barPlotData.data.datasets[0].data[0] = 100;
                this.state.barPlotData.data.datasets[0].data[0] = total_windmill/total_consumption*100;
                this.state.barPlotData.data.datasets[1].data[0] = total_solar/total_consumption*100;
            }
        } 

        console.log(this.state.barPlotData.data.datasets[0].data)
    }

    componentDidMount() {
        console.log(this.state.daily_numbers)
        this.getDataFromElOverblik();
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