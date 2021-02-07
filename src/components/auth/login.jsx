import React, { Component, setError } from "react";
import { auth, generateUserDocument } from "../firebase";
import './login.css'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideActive: "sign-container",
      buttonState: "sign-button",
      email: "",
      password: "",
      displayName: "",
      errorMessage: "",
    };

    this.changeToSignIn = this.changeToSignIn.bind(this);
    this.changeToSignUp = this.changeToSignUp.bind(this);
  }

  createUserWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();

    console.log("Email: %s, Password: %s", this.state.email, this.state.password);
    await auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((result) => {
      console.log("User %s", result.user);
      generateUserDocument(result.user, this.state.displayName);
    }).catch((error) => {
      this.setState({ errorMessage: error.message })
    });

    this.setState({ email: "", password: "", displayName: "", errorMessage: "" });
    this.changeToSignIn();
  };

  signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });

    const { history } = this.props;

    history.push("/");

  };

  setEmail(email) {
    this.setState({ email: email, errorMessage: "" });
  }

  setPassword(password) {
    this.setState({ password: password, errorMessage: "" });
  }

  changeToSignUp() {
    this.setState({ sideActive: "sign-container right-panel-active" })
  }

  changeToSignIn() {
    this.setState({ sideActive: "sign-container" })
  }

  validateForm() {
    const state = this.state.email.length > 0 && this.state.password.length > 0;
    return state;
  }

  handleSubmit(event, email, password) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="sign-body">
        <div className={this.state.sideActive} id="container">
          <div className="sign-form-container sign-up-container">
            <form className="sign-form" action="#">
              <h1 className="sign-h1">Opret konto</h1>
              <span className="sign-span">Indtast din email for at oprette en konto</span>
              <input className="sign-input" type="text" placeholder="Name" />
              <input onChange={(e) => this.setEmail(e.target.value)} className="sign-input" type="email" placeholder="Email" />
              <input onChange={(e) => this.setPassword(e.target.value)} className="sign-input" type="password" placeholder="Password" />
              <p className="sign-p-error">{this.state.errorMessage}</p>
              <button className="sign-button" onClick={event => {
                this.createUserWithEmailAndPasswordHandler(event);
              }} disabled={!this.validateForm()} >Tilmeld</button>
            </form>
          </div>
          <div className="sign-form-container sign-in-container">
            <form className="sign-form" action="#">
              <h1 className="sign-h1">Login</h1>
              <input onChange={(e) => this.setEmail(e.target.value)} className="sign-input" type="email" placeholder="Email" />
              <input onChange={(e) => this.setPassword(e.target.value)} className="sign-input" type="password" placeholder="Password" />
              <a href="/">Glemt kodeord?</a>
              <button className="sign-button" onClick={(event) => { this.signInWithEmailAndPasswordHandler(event) }} disabled={!this.validateForm()}>Login</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="sign-overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="sign-h1">Velkommen tilbage</h1>
                <p className="sign-p">Se dine udførte beregninger igen</p>
                <button onClick={this.changeToSignIn} className="ghost sign-button" id="signIn">Login</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="sign-h1">Opret konto</h1>
                <p className="sign-p">Få adgang til solcelle beregneren</p>
                <button onClick={this.changeToSignUp} className="ghost sign-button" id="signUp">Tilmeld</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;