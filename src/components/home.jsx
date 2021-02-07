import React, { Component } from "react";
import Navigation from './navigation/navigation';
import Header from './header';
import Beregner from './beregner';
import About from './about/about';
import Services from './services';
import EnergyConsumption from "./energy_consumption/energy_consumption_dk"



export class home extends Component {

  render() {
    return (
      <div>
        <Navigation user={this.props.user} />
        <Header data={this.props.landingPageData.Header} />
        <EnergyConsumption data={this.props.landingPageData.Energi} />
        <Services data={this.props.landingPageData.Services} />
        <Beregner data={this.props.landingPageData.Beregner} />
        <About data={this.props.landingPageData.About} />
      </div>
    );
  }
}

export default home;