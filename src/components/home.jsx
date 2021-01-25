import React, { Component } from "react";
import Navigation from './navigation/navigation';
import Header from './header';
import Beregner from './beregner';
import About from './about/about';
import Services from './services';
import EnergyConsumption from "./energy_consumption/energy_consumption_dk"
import JsonData from "../data/data.json"


export class home extends Component {
    state = {
        landingPageData: {},
      }
      
    getlandingPageData() {
        this.setState({landingPageData : JsonData})
    }
    
    componentDidMount() {
        this.getlandingPageData();
    }

  render() {
    return (
        <div>
            <Navigation />
            <Header data={this.state.landingPageData.Header} />
            <EnergyConsumption data={this.state.landingPageData.Energi} />
            <Services data={this.state.landingPageData.Services} />
            <Beregner data={this.state.landingPageData.Beregner} />
            <About data={this.state.landingPageData.About} />
        </div>
    );
  }
}

export default home;