import React, { Component } from 'react';
import openSocket from "socket.io-client";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {createUser, checkAvailability, connectToSocket, getEvent} from '../api/index';
import Login from '../login/index';
import "./register.css"

class Register extends Component {
  constructor(props){
	  super(props);
	  this.state = {
		  username_field: "",
		  password_field: "",	
		  email_address_field: "",
		  first_name_field: "",
		  last_name_field: "",
		  
		  username_field_error: "",
		  password_field_error: "",
		  email_field_error: "",
		  first_name_field_error: "",
		  last_name_field_error: "",
		  
		  register_success: false,
	  }
  }  
  
  onRegister = e => {
		  e.preventDefault();
		  let userObj;
		  let salt = "";
		  let hashed_password = this.state.password_field;
		  
		  let new_userObj = {
            'username': this.state.username_field,
            'password_hash': hashed_password,
            'first_name': this.state.first_name_field,
            'last_name': this.state.last_name_field,
			'friends': [],
			'salt': salt,
		  };
		  
		  if (this.state.username_field === ""){
			this.setState({
				username_field_error: "Account username cannot be left blank!",
			})
		  } else {
			  this.setState({
				username_field_error: "",
			  })
		  }
		  if (this.state.password_field === "") {
			  this.setState({
				password_field_error: "Account password cannot be left blank!",
		     })
		  } else {
			  this.setState({
				password_field_error: "",
			  })
		  }	  
		  if (this.state.username_field !== "" && this.state.password_field !== "") {
			   checkAvailability(new_userObj, result => {
				  if (result == "not found"){
					createUser(new_userObj, userObj => {
						console.log("User account has been created!");
						this.setState({
							register_success: true,
						})
					});
				  }
				  else {
					console.log("User already Exists!");	  
					this.setState({
						username_field_error: "Account username: " + this.state.username_field + " is already registered!",
						username_field: "",
					})
				  }
			  });
		  }
  }
  
  renderLogin = () => {
    if (this.state.register_success) {
      return <Redirect to='/' />
    }
  }
  
  render() {
    return (
			<div>
				{this.renderLogin()}
				<div className="title">
					<h1>Planorama</h1>
				</div>
				<div className="registerbox">
					<h1>Register your account</h1>
					<form>
					<p>Username:</p><p class="field-error">{this.state.username_field_error}</p>
					<input type="text" name="" placeholder="Enter a Username" value={this.state.username_field} onChange={e => this.setState({ username_field: e.target.value })}/>
					<p>E-mail (*):</p><p class="field-error">{this.state.email_field_error}</p>
					<input type="text" name="" placeholder="Enter your E-mail Address" value={this.state.email_address_field} onChange={e => this.setState({ email_address_field: e.target.value })}/>
					<p>Password:</p><p class="field-error">{this.state.password_field_error}</p>
					<input type="password" name="" placeholder="Enter a Password" value={this.state.password_field} onChange={e => this.setState({ password_field: e.target.value })}/>
					<p>First Name (*):</p><p class="field-error">{this.state.first_name_field_error}</p>
					<input type="text" name="" placeholder="Enter your first name" value={this.state.first_name_field} onChange={e => this.setState({ first_name_field: e.target.value })}/>
					<p>Last Name (*):</p><p class="field-error">{this.state.last_name_field_error}</p>
					<input type="text" name="" placeholder="Enter your last name" value={this.state.last_name_field} onChange={e => this.setState({ last_name_field: e.target.value })}/>
					<button onClick={e => this.onRegister(e)}>Register</button>
					</form>
				</div>
			</div>
    );
  }
}

export default Register;
