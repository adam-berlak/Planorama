import openSocket from "socket.io-client";
import React, {Component} from 'react';
import {connectToSocket, getEvent} from '../api/index';
import EventHeader from './eventHeader';
import DetailsBox from './detailsBox';
import DescriptionBox from './descriptionBox';
import GuestsBox from './guestsBox';
import CommentBox from './commentBox';
import {inviteToEvent} from "../api/index";
import './viewEvent.css';



class ViewEvent extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.getRecentComments = this.getRecentComments.bind(this);
    this.inviteByUsername = this.inviteByUsername.bind(this);

  }
  // if props contains event info than set state, otherwise right now we grab random event, should change this to
  // redirecting them to my events or login in the else case
  componentDidMount() {
    
    if(this.props.location.state) {
        this.setState(this.props.location.state.event);
        // console.log('viewEvent Page mounted');
        // console.log(this.props.location.state);
    // } else {
    //   connectToSocket((message) => console.log(message));
    //   getEvent(0, event => {
    //     this.setState(event);
    //   });
    }
    // console.log(this.props.location.state);
    //inviteToEvent("john", this.props.location.state.event._id);
  }

  inviteByUsername(username) {
      inviteToEvent(username, this.props.location.state.event._id);
  }

  getRecentComments(comments){
      this.setState({comments: comments});
      // console.log(comments);
  }

  render() {

    return (

      <div>
       <EventHeader event_name={this.state.event_name} event_owner = {this.state} userinfo={this.props.location.state.userinfo} />
       <div className="main-container">
           <CommentBox comments={this.props.location.state.event.comments} eventID={this.props.location.state.event._id} userinfo={this.props.location.state.userinfo} method={this.getRecentComments}/>
         <div className="detail-container">
           <DetailsBox date={this.state.date} location={this.state.location} creator={this.state.owner_id}/>
           <DescriptionBox description={this.state.description}/>
           <GuestsBox data={this.state} invite={this.inviteByUsername}/>
         </div>

       </div>


      </div>
    );
  }
}

export default ViewEvent;
