import React, {Component} from 'react';
import './eventContainer.css';
import {withRouter} from "react-router-dom";
import {acceptInvite, declineInvite} from "../api";

class InvitedEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.viewEvent = this.viewEvent.bind(this);
        this.acceptClick = this.acceptClick.bind(this);
        this.declineClick = this.declineClick.bind(this);
    }

    viewEvent(){
        this.props.history.push({pathname:'/view-event',
            state: {event:this.props.event,
                userinfo: this.props.userinfo} });
    }

    declineClick(){
        // console.log(this.props);
        declineInvite(this.props.userinfo.username, this.props.event._id)
    }
    acceptClick(){
        // console.log(this.props);
        acceptInvite(this.props.userinfo.username, this.props.event._id)
    }

    render() {


        return (
            <div className="pastEventContainer">
                <div className="pastEventItem">
                    <h3>{this.props.event.event_name}</h3>
                </div>
                <div className="pastEventItem">
                    <h3>{this.props.event.date}</h3>
                </div>
                <div className="pastEventItem">
                    <h3>{this.props.event.start_time}-{this.props.event.end_time} </h3>
                </div>

                <button className="viewButton" onClick={this.viewEvent}>
                    View
                </button>
                <button className="viewButton" onClick={this.acceptClick}>
                    Accept
                </button>
                <button className="viewButton" onClick={this.declineClick} >
                    Decline
                </button>

            </div>
        )
    }
}

export default withRouter(InvitedEvent);