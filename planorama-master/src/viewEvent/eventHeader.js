import React, { Component } from 'react';
import "./eventHeader.css"
import {withRouter} from "react-router-dom";
class EventHeader extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.myEvents = this.myEvents.bind(this);
        this.editEvent = this.editEvent.bind(this);
    }
    componentDidMount(){
        console.log(this.props.location.state);
    }
    myEvents(){
        this.props.history.push({pathname:'/view-events',
            state: {username:this.props.userinfo.username} });
    }
    editEvent(){
        this.props.history.push({pathname:'/edit-event',
            state: {event_info:this.props.location.state.event,
                    user_info: this.props.userinfo}
         });
    }

    render() {
        let editButton = null;
        if (this.props.event_owner.owner_id == this.props.userinfo.username){
            editButton = <button className="eventNameBar" onClick={this.editEvent}>
            Edit
        </button>
        }
        // console.log(this.props.event_owner.owner_id)
        return (
            <div id="eventHeader">
                <div id="headerImage">

                </div>
                <div className="eventNameBar">
                    <h1>
                        {this.props.event_name}
                    </h1>
                    <button onClick={this.myEvents}>
                        My Events
                    </button>
                    {editButton}

                </div>

            </div>
        )
    }
}

export default withRouter(EventHeader);