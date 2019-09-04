import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './login';
import Register from './register';
import CreateEvent from './createEvent';
import ViewEvent from './viewEvent'
import EditEvent from './editEvent'
import ViewEvents from './myEvents'
import ForgotPassword from './forgotPassword'
import ResetPassword from './resetPassword'
import Dashboard from './dashboard';
import { connectToSocket } from "./api";

import './App.css';

function LoginPage() {
	return (<Login/>)
}

function RegisterPage() {
	return (<Register/>)
}	

function CreateEventPage() {
	return (<CreateEvent/>)
}

function viewEvent() {
	return (<ViewEvent/>)
}

function editEvent() {
	return (<EditEvent/>)
}

function viewEvents() {
	return (<ViewEvents/>)
}

function forgotPassword() {
	return (<ForgotPassword/>)
}

function resetPassword() {
	return (<ResetPassword/>)
}

function logout() {
        this.props.history.push({pathname:'/view-events'});
}


class App extends Component {
  /*constructor(props){
	  super(props);
	  this.state = {isLoggedIn: false};
    connectToSocket(message => {
      console.log(message);
    });
	}
	*/

  render() {
	// const isLoggedIn = false;
	/*if (this.props.isLoggedIn){
		this.state.isLoggedIn = this.props.isLoggedIn;
	}

	if (this.state.isLoggedIn){
		return (
	      <Dashboard/>
	    );
	} else {
		return (
	      <Login/>
	    );
	}
*/	

	return ( 
	<Router>
		<div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Logout</Link> 
					</li>
				</ul>
			</nav>

			<Route path="/" exact component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/create-event" component={CreateEvent} />
			<Route path="/view-event" component={ViewEvent} />
			<Route path="/edit-event" component={EditEvent} />
			<Route path="/view-events" component={ViewEvents} />
			<Route path="/forgot-password" component={ForgotPassword} />
			<Route path="/reset-password" component={ResetPassword} />
		</div>
	</Router>
	)};
	
}

export default App;
