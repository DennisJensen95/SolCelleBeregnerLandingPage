import React, { Component } from 'react'
import Login from "./components/auth/login"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/home"
import ProfilePage from "./components/profile_page/profile_page"
// import Firebase from "./components/firebase"

export class App extends Component {
  render() {
    const user = null;
    return (
      user ?
        <ProfilePage />
        :
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Home user={user} />
            </Route>
            <Route path="/login" component={Login}>
            </Route>
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App;
