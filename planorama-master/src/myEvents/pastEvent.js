import React, {Component} from 'react';
import './eventContainer.css';
import {withRouter} from "react-router-dom";

class PastEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.viewEvent = this.viewEvent.bind(this);
    }

    viewEvent(){
        this.props.history.push({pathname:'/view-event',
                                state: {event:this.props.event,
                                        userinfo: this.props.userinfo} });
        //console.log(this.props.event);
        // console.log(this.props.userinfo);

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

            </div>
        )
    }
}

export default withRouter(PastEvent);