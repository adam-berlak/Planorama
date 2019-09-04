import React, {Component} from 'react';
import "./eventBoxes.css"
import "./comment.css"


class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.comment;
    }

    timestampToString(timestamp){
        let time = new Date(timestamp);
        let mins = (time.getMinutes() < 10 ? '0' : "") + time.getMinutes();
        let timeString = time.getHours() + ":" + mins;
        return timeString;
    }

    render() {
        return (
            <li id="box">
                <div id="userInfo">
                    {this.timestampToString(this.state.timestamp)}    {this.state.username} Commented:
                </div>
                <div id="textContainer">
                    {this.state.comment}
                </div>
            </li>
        )
    }
}

export default Comment;