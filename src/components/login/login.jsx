import React, { Component } from "react";
import './login.css'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sideActive: "sign-container"
    };
    
    this.changeToSignIn = this.changeToSignIn.bind(this);
    this.changeToSignUp = this.changeToSignUp.bind(this);
  }

  changeToSignUp() {
    this.setState({sideActive: "sign-container right-panel-active"})
  }

  changeToSignIn() {
    this.setState({sideActive: "sign-container"})
  }

  render () {
    return(
      <body class="sign-body">
        <div class={this.state.sideActive} id="container">
          <div class="sign-form-container sign-up-container">
            <form class="sign-form" action="#">
              <h1 class="sign-h1">Opret konto</h1>
              <span class="sign-span">Indtast din email for at oprette en konto</span>
              <input class="sign-input" type="text" placeholder="Name" />
              <input class="sign-input" type="email" placeholder="Email" />
              <input class="sign-input" type="password" placeholder="Password" />
              <button class="sign-button">Tilmeld</button>
            </form>
          </div>
          <div class="sign-form-container sign-in-container">
            <form class="sign-form" action="#">
              <h1 class="sign-h1">Login</h1>
              <input class="sign-input" type="email" placeholder="Email" />
              <input class="sign-input" type="password" placeholder="Password" />
              <a href="/">Glemt kodeord?</a>
              <button class="sign-button">Login</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="sign-overlay">
              <div class="overlay-panel overlay-left">
                <h1 class="sign-h1">Velkommen tilbage</h1>
                <p>Se dine udførte beregninger igen</p>
                <button onClick={this.changeToSignIn} class="ghost sign-button" id="signIn">Login</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1 class="sign-h1">Opret konto</h1>
                <p class="sign-p">Få adgang til solcelle beregneren</p>
                <button onClick={this.changeToSignUp} class="ghost sign-button" id="signUp">Tilmeld</button>
              </div>
            </div>
          </div>
        </div>
    </body>
  );
  }
}

export default Login;