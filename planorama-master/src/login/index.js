import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {verifyUser} from '../api/index';
import Register from '../register/index';
import "./login.css"

class Login extends Component {
  constructor(props){
	  super(props);
	  this.state = {
		  register_clicked: false,
		  login_status: false,
		  username_field: "",
		  password_field: "",	
		  
		  username_field_error: "",
		  password_field_error: "",
	  }
  }  
  
  onLogin = e => {
	  e.preventDefault();  
	  let new_userObj = {
            'username': this.state.username_field,
            'password_hash': this.state.password_field,
	  };
	  verifyUser(new_userObj, response => {
		if (response == "not found"){
			console.log("Account username and password does not match!");
			this.setState({
				username_field_error: "Account username and password does not match!",
				password_field_error: "Account username and password does not match!",
				username_field: "",
				password_field: "",	
			})
		} else {
			console.log("You have been logged in!");
			this.setState({
				login_status: true
			})
		}
	  });
  };
  
  setRegister = () => {
		this.setState({
			register_clicked: true
		})
	};
  renderRegister = () => {
    if (this.state.register_clicked) {
      return <Redirect to='/register' />
    }
  };
  renderHome = () => {
    if (this.state.login_status) {
      return <Redirect to={{
		  pathname: '/view-events',
		  state: { username: this.state.username_field }
	  }}/>
    }
  };
  /*
  hashPassword(inPassword){
	  bcrypt = require('bcrypt');
	  bcrypt.genSalt(11, function (err, salt) {
		  if (err){
			  return console.log(err);
		  }
		  bcrypt.hash(inPassword, salt, function (err, hashedPassword) {
			  if (err) {
				  return console.log(err);
			  }
			  return hashedPassword;
		  });
	  });
  }
  */
  render() {
    return (
			<div>
				{this.renderRegister()}
				{this.renderHome()}
				<div className="title">
					<h1 id='titleHeader'>Planorama</h1>
				</div>
				<div id="loginbox" className="loginbox">
					<h2>Login</h2>
					<form>
					<p>Username:</p><p className="field-error">{this.state.username_field_error}</p>
					<input type="text" name="" placeholder="Enter Username" value={this.state.username_field} onChange={e => this.setState({ username_field: e.target.value })}/>
					<p>Password:</p><p className="field-error">{this.state.password_field_error}</p>
					<input type="password" name="" placeholder="Enter Password" value={this.state.password_field } onChange={e => this.setState({ password_field: e.target.value })}/>
					{/* <Link id="forgot-password-link" to="/forgot-password">Forgot your password?</Link> */}
					<button onClick={e => this.onLogin(e)}>Login</button>
					<button onClick={this.setRegister}>Register</button>
					</form>
				</div>
				<Route path="/register" component={Register} />
			</div>
    );
  }
}

export default Login;
