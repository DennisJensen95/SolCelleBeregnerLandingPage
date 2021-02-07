import React, { Component } from "react";
import Navigation from "../navigation/navigation";
import Services from '../services';
import EnergyConsumption from "../energy_consumption/energy_consumption_dk";
import Profile from "./profile"

export class ProfilePage extends Component {

    render() {
        return (
            <div>
                <Navigation user={this.props.user} />
                <Profile user={this.props.user} />
                <Services data={this.props.landingPageData.Services} />
                <EnergyConsumption data={this.props.landingPageData.Energi} />
            </div>
        );
    }
}
export default ProfilePage;