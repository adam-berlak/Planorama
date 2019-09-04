import React, {Component} from 'react';
import './createEvent.css'
import BlueHeaderBox from './BlueHeaderBox.js'
import Calendar from './Calendar.js'
import TimeSelector from './TimeSelector.js'
import {createEvent} from '../api/index'


class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitEvent = this.submitEvent.bind(this);
        this.myEvents = this.myEvents.bind(this);
        // console.log(this.props.location.state);
    }

    componentDidMount() {
    }

    submitEvent() {

    
        
        let eventJSON = {
            owner_id: this.props.location.state.user_info.username,
            event_name: document.getElementById('eventNameInput').value,
            description: document.getElementById('eventDescriptionInput').value,
            start_time: document.getElementsByClassName('rc-time-picker-input')[0].value,
            end_time: document.getElementsByClassName('rc-time-picker-input')[1].value,
            date: document.querySelector('.date-box input').value,
            location: document.querySelector('.location-box input').value,
            userlist: [{user_id: this.props.location.state.user_info._id,
                        username: this.props.location.state.user_info.username,
                        status: "Going"}],
            comments: []
        };
        createEvent(eventJSON, event => {

            console.log(event)
        });
        this.myEvents();


    }
    myEvents() {
        this.props.history.push({pathname:'/view-events',
            state: {username:this.props.location.state.user_info.username} });
    }

    render() {
        return (
            <div id="createEvent-container">
                <div className='button-container'>
                    <button text='submit' onClick={this.submitEvent}>Submit</button>
                    <button text='myEvents' onClick={this.myEvents}>My Events</button>
                </div>
                
                <BlueHeaderBox title="Event">
                    <h3> Event Information </h3>
                    <form>
                        <div className='name-box'>
                            <label>Event Name:</label>
                            <input id='eventNameInput' type="text" placeholder="Phteven's Birthday Bash"></input>
                        </div>
                        <div className='date-box'>
                            <label>Date:</label>
                            <Calendar></Calendar>
                        </div>
                        <div className='time-box'>
                            <label>Start Time: </label>
                            <TimeSelector></TimeSelector>
                        </div>
                        <div className='time-box'>
                            <label>End Time: </label>
                            <TimeSelector></TimeSelector>
                        </div>
                        <div className='description-box'>
                            <label>Description: </label>
                            <textarea id='eventDescriptionInput' placeholder='Describe your event'></textarea>
                        </div>
                    </form>
                </BlueHeaderBox>
                <BlueHeaderBox title="This is a different title">
                    <div className='location-box'>
                        <label>Location:</label>
                        <input type='text' placeholder='Enter event location'></input>
                    </div>
                </BlueHeaderBox>
            </div>
        );
    }
}

export default CreateEvent;
