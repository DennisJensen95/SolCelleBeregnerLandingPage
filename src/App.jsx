import React, { Component } from 'react'
import Login from "./components/login/login"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/home"

export class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact>
          </Route>
          <Route path="/login" component={Login}>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
