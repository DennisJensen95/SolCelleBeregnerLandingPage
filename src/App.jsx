import React, { Component } from 'react'
import Navigation from './components/navigation';
import Header from './components/header';
import JsonData from './data/data.json';
import EnergyConsumption from "./components/energy_consumption_dk"

export class App extends Component {
  state = {
    landingPageData: {},
  }
  getlandingPageData() {
    this.setState({ landingPageData: JsonData })
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
      </div>
    )
  }
}

export default App;
