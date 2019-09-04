import React, {Component} from 'react';
import EventContainer from './eventContainer'
import {getMyEvents, checkAvailability} from "../api";
import {Redirect} from "react-router-dom";
import './myEvents.css'

class ViewEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "invited": [],
            "upcoming": [],
            "past": [],
            "create_clicked": false
        };
    }

    componentDidMount() {
        if (typeof this.props.location.state === 'undefined') {
            this.props.history.push({pathname: '/login'});

        } else {
            // api call that gets user info from username
            checkAvailability({username:this.props.location.state.username }, (user) => {
               this.setState({"invited": [],
                   "upcoming": [],
                   "past": [],
                   "create_clicked": false,
                    "user_info": user});
                getMyEvents({"_id": user._id}, events => {
                    // console.log(events);
                    //this.setState(events);
                    if (events && events.length > 0) {
                        this.parseEvents(events);
                    }

                });
            });

        }

    }

    parseEvents(events) {
        let invitedEvents = [];
        let upcomingEvents = [];
        let pastEvents = [];
        let declinedEvents = [];
        // console.log(events);
        for (let i = 0; i < events.length; i++) {
            let userList = events[i].userlist;
            for (let j = 0; j < userList.length; j++) {
                let eventTime = new Date(events[i].timestamp);
                let now = new Date();
                if (userList[j].user_id === this.state.user_info._id && userList[j].status === "Pending") {
                    invitedEvents.push(events[i]);
                } else if (userList[j].user_id === this.state.user_info._id && userList[j].status === "Declined"){
                    declinedEvents.push(events[i]);
                } else if (userList[j].user_id === this.state.user_info._id && userList[j].status !== "Pending" && eventTime.getTime() > now) {
                    upcomingEvents.push(events[i]);
                } else {
                    pastEvents.push(events[i]);
                }
            }

        }
        this.setState((prevState) =>{
            return(
                {"invited": invitedEvents,
                "upcoming": upcomingEvents,
                "past": pastEvents,
                "create_clicked": false,
                "user_info": prevState.user_info,
                });

        });
        // console.log(this.state);
    }

    createClicked = () => {
        this.setState({
            create_clicked: true
        })
    };

    renderCreateEvent = (userInfo) => {
        if (this.state.create_clicked) {
            return <Redirect to={{
                pathname: '/create-event',
                state: { user_info: userInfo }
            }}/>
        }
    };

    render() {
        return (

            <div id='myEvents-container'>
                {this.renderCreateEvent(this.state.user_info)}
                <h1 id="pageTitle">My Events</h1>
                <button id="createEventButton" onClick={this.createClicked}>Create Event</button>
                <EventContainer title={"Invited Events"} events={this.state.invited} type="invited" userinfo={this.state.user_info}/>
                <EventContainer title={"Upcoming Events"} type="upcoming" events={this.state.upcoming} userinfo={this.state.user_info}/>
                <EventContainer title={"Past Events"} events={this.state.past} type="past" userinfo={this.state.user_info}/>
            </div>
        );
    }
}

export default ViewEvents;
