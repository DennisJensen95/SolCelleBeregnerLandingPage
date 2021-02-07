import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProfilePage from "./profile_page/profile_page"
import { UserContext } from "./providers/user_provider";
import Login from './auth/login'
import React, { useContext } from 'react'
import Home from "./home"
import JsonData from "../data/data.json"

function getlandingPageData() {
    return { landingPageData: JsonData };
}

function componentDidMount() {
    return getlandingPageData();
}


function Application() {
    const user = useContext(UserContext);

    const state = componentDidMount();


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home user={user} landingPageData={state.landingPageData} />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/profile" exact>
                    <ProfilePage user={user} landingPageData={state.landingPageData} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Application;