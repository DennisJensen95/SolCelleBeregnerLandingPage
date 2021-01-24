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

    
    
    getDataFromElOverblik() {
        axios.get('https://www.energidataservice.dk/proxy/api/datastore_search_sql?sql=SELECT * from "electricitybalancenonv" ORDER BY "HourDK" DESC LIMIT 8760', 
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
        const day = 1*24;
        const week = 7*24;
        const month = 30*24;
        const year = 365*24;
        var total_consumption = 0;
        var total_windmill = 0;
        var total_solar = 0;
        var windmill_energy = [0, 0, 0, 0];
        var solar_energy = [0, 0, 0, 0];

        console.log("Energy today: " + records[0]["HourDK"]);
        console.log("Energy last date: " + records[records.length-1]["HourDK"]);

        for (var i=0; i < records.length; i++) {
            total_consumption += records[i].TotalLoad;
            total_windmill += records[i].OffshoreWindPower + records[i].OnshoreWindPower;
            total_solar += records[i].SolarPower;
            if (i+1 === day) {
                windmill_energy[3] = Number((total_windmill/total_consumption*100).toFixed(1));
                solar_energy[3] = Number((total_solar/total_consumption*100).toFixed(1));
            } else if (i+1 === week) {
                windmill_energy[2] = Number((total_windmill/total_consumption*100).toFixed(1));
                solar_energy[2] = Number((total_solar/total_consumption*100).toFixed(1));
            } else if (i+1 === month) {
                windmill_energy[1] = Number((total_windmill/total_consumption*100).toFixed(1));
                solar_energy[1] = Number((total_solar/total_consumption*100).toFixed(1));
            } else if (i+1 === year) {
                windmill_energy[0] = Number((total_windmill/total_consumption*100).toFixed(1));
                solar_energy[0] = Number((total_solar/total_consumption*100).toFixed(1));
            }
        } 

        
        this.barPlotData.data.datasets[0].data = windmill_energy;
        this.barPlotData.data.datasets[1].data = solar_energy;


        this.setState({})
    }

    componentDidMount() {
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