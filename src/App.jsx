import React, { Component } from 'react'
import Navigation from './components/navigation';
import Header from './components/header';
import Beregner from './components/beregner';
import About from './components/about';
import Services from './components/services';
import JsonData from './data/data.json';

export class App extends Component {
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
        <About data={this.state.landingPageData.About} />
        <Services data={this.state.landingPageData.Services} />
        <Beregner data={this.state.landingPageData.Beregner} />
      </div>
    )
  }
}

export default App;
