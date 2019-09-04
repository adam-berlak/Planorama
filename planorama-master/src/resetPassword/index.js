import React, { Component } from 'react';
import openSocket from "socket.io-client";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {createUser, checkAvailability, connectToSocket, getEvent, sendConfirmationCode, updateUserPassword } from '../api/index';
import resetPassword from '../resetPassword/index';
import "./forgotPassword.css"

class ResetPassword extends Component {
  constructor(props){
	  super(props);
	  this.state = {
		  username_field: "",
		  password_field: "",	
		  confirmation_code_field: "", 
		  request_success: false,
	  }
  }  
  
  updatePassword = e => {
	e.preventDefault();
       let new_userObj = {
			'username': this.state.username_field,
			'password_hash': this.state.password_field,
			'verification_code': this.state.confirmation_code_field
	   };
	   updateUserPassword(new_userObj, result => {	   
		   if (result === "not found") {
			   console.log("user not found with those details");
		   } else {
			   this.setState({
				   request_success: true,
			   })
			   console.log("user details have been changed!");
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
				<p>We have sent you an email containing your account username and confirmation code</p>          
				<form>
					<p>Username:</p><p class="field-error">{this.state.email_field_error}</p>
					<input type="text" name="" placeholder="Enter your Username" value={this.state.username_field} onChange={e => this.setState({ username_field: e.target.value })}/>
					<p>New Password:</p><p class="field-error">{this.state.email_field_error}</p>
					<input type="text" name="" placeholder="Enter your new Password" value={this.state.password_field} onChange={e => this.setState({ password_field: e.target.value })}/>
					<p>Confirmation Code:</p><p class="field-error">{this.state.email_field_error}</p>
					<input type="text" name="" placeholder="Enter your confirmation code" value={this.state.confirmation_code_field} onChange={e => this.setState({ confirmation_code_field: e.target.value })}/>
					<button onClick={e => this.updatePassword(e)}>Update Account Details</button>
				</form>
			</div>
       </div>
    );
  }
}

export default ResetPassword;
