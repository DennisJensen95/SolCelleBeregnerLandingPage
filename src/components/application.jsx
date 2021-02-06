import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProfilePage from "./profile_page/profile_page"
import Login from './auth/login'
import React, { Component } from 'react'
import Home from "./home"

export class Application extends Component {
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

export default Application;