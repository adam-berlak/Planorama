import React, { Component } from 'react';
import openSocket from "socket.io-client";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {createUser, checkAvailability, connectToSocket, getEvent, sendConfirmationCode } from '../api/index';
import resetPassword from '../resetPassword/index';
import "./forgotPassword.css"

const nodemailer = require("nodemailer");

class ForgotPassword extends Component {
   constructor(props){
	  super(props);
	  this.state = {
		  email_field: "",
		  email_field_error: "",
		  
		  request_success: false,
	  }
  }  
  
  sendEmail = e => {
	e.preventDefault();
       let new_userObj = {
			'email': this.state.email_address_field
	   };
	   sendConfirmationCode(new_userObj, result => {	   
		   if (result === "not found") {
			   console.log("user not found with that email!");
		   } else {
			   this.setState({
				   request_success: true,
			   })
			   console.log("email has been sent!");
		   }
	   });
  }
  
  renderResetPassword = () => {
    if (this.state.request_success) {
      return <Redirect to='/reset-password' />
    }
  }
  
  render() {
    return (
      <div>
			{this.renderResetPassword()}
			<div className="title">
				<h1>Planorama</h1>
				</div>
				<div className="forgotpassbox">
				<h1>Reset your Password</h1>
				<p>Enter your email address below to recieve instructions to reset your password!</p>          
				<form>
					<p>E-mail:</p><p class="field-error">{this.state.email_field_error}</p>
					<input type="text" name="" placeholder="Enter your E-mail Address" value={this.state.email_field} onChange={e => this.setState({ email_field: e.target.value })}/>
					<button onClick={e => this.sendEmail(e)}>Send Confirmaton Code</button>
				</form>
			</div>
       </div>
    );
  }
}

export default ForgotPassword;
