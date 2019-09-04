import React, {Component} from 'react';
import './eventContainer.css'
import '../createEvent/BlueHeaderBox.css'
import PastEvent from './pastEvent';
import InvitedEvent from "./invitedEvent";

class EventContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {events: []};

    }


    render() {
        // console.log(this.props.userinfo);
        const events = this.props.events;
        const eventType = this.props.type;
        if (typeof events !== 'undefined') {
            if (eventType === 'past') {
                return (
                    <div className="Container">
                        <div className="blue-box-nav">
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="eventDetailBar">
                            <div className="eventDetailText">
                                <h2 >
                                    Event:
                                </h2>
                            </div>
                            <div className="eventDetailText">
                                <h2>
                                    Date:
                                </h2>
                            </div>
                            <div className="eventDetailText">
                                <h2 >
                                    Time:
                                </h2>
                            </div>

                        </div>
                        <div className={"pastEvent"}>
                            {
                                this.props.events.map((event, index) => {
                                    return (<PastEvent key={index} event={event} userinfo={this.props.userinfo}/>)
                                })
                            }
                        </div>
                    </div>
                );
            } else if (eventType === 'invited') {
                return (
                    <div className="Container">
                        <div className="blue-box-nav">
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="eventDetailBar">
                            <div>
                                <h2 className="eventDetailText">
                                    Event:
                                </h2>
                            </div>
                            <div>
                                <h2 className="eventDetailText">
                                    Date:
                                </h2>
                            </div>
                            <div>
                                <h2 className="eventDetailText">
                                    Time:
                                </h2>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className={"pastEvent"}>
                            {
                                this.props.events.map((event, index) => {
                                    return (<InvitedEvent key={index} event={event} userinfo={this.props.userinfo}/>)
                                })
                            }
                        </div>
                    </div>
                );
            } else if (eventType === "upcoming"){
                return (
                    <div className="Container">
                        <div className="blue-box-nav">
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="eventDetailBar">
                            <div>
                                <h2 className="eventDetailText">
                                    Event:
                                </h2>
                            </div>
                            <div>
                                <h2 className="eventDetailText">
                                    Date:
                                </h2>
                            </div>
                            <div>
                                <h2 className="eventDetailText">
                                    Time:
                                </h2>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className={"pastEvent"}>
                            {
                                this.props.events.map((event, index) => {
                                    return (<PastEvent key={index} event={event} userinfo={this.props.userinfo}/>)
                                })
                            }
                        </div>
                    </div>
                );

            }

        } else {
            return (
                <div className="Container">
                    <div className="blue-box-nav">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="eventDetailBar">
                        <div>
                            <h2 className="eventDetailText">
                                Event:
                            </h2>
                        </div>
                        <div>
                            <h2 className="eventDetailText">
                                Date:
                            </h2>
                        </div>
                        <div>
                            <h2 className="eventDetailText">
                                Time:
                            </h2>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className={"pastEvent"}>

                    </div>
                </div>
            );
        }

    }
}

export default EventContainer;
