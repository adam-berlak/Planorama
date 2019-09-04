import React, {Component} from 'react';
import "./commentBox.css"
import "./eventBoxes.css"
// import {commentOnEvent} from '../api/index';
import {socket} from '../api/index';
import Comment from './comment'




class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {comment: "",
                    comments:[]};
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.postComment = this.postComment.bind(this);
        this.updateCommentList = this.updateCommentList.bind(this);
        // this.commentOnEvent = this.commentOnEvent.bind(this);
       
        this.state.comments = this.props.comments
    }
    componentDidMount() {
        socket.emit('join-room',this.props.eventID);
        document.getElementById('comments').scrollTop = (this.state.comments.length * 80);
        socket.on('serverNewComment', (message) => {
            console.log(message);
            this.state.comments.push(message)
            console.log(this.state.comments);
            this.setState({comments: this.state.comments})
            document.getElementById('comments').scrollTop = (this.state.comments.length * 80);
            // document.getElementById('comments').append(<Comment comment={message}/>
        });
        
    }
    componentWillUnmount() {
        socket.removeEventListener('serverNewComment');
        socket.emit('leave-room', this.props.eventID);
    }

    handleCommentChange(event){
        this.setState({
            comments:this.state.comments,
            comment:event.target.value})
    }

    updateCommentList = (newComment) => {
        this.setState({
                comments :[...this.props.comments, newComment]
        })   
    }

    postComment(){
        //NEED TO ADD ACTUAL USER_ID AND USERNAME
        let comment = { user_id: this.props.userinfo._id,
                        username:this.props.userinfo.username,
                        timestamp:Date.now(),
                        comment:this.state.comment};

        socket.emit('commentOnEvent', this.props.eventID, comment)
        this.state.comment = '';
        // this.commentOnEvent(this.props.eventID, comment, );


    }

    

    // commentOnEvent(eventID, comment, cb){
    //     let event = {'_id': eventID, 'comment':comment};
    //     // emit comment to be added to event
    //     socket.emit('commentOnEvent', event);
    //     // listen for response from server
    //     socket.on('serverCommentResponse', comment => {
    //        alert(comment.comment);
    //     });
    // }


    render() {

        const comments = this.state.comments;
        if (typeof comments !== 'undefined'){
            return (
                <div className="commentBox">
                    <div className="details-box-header">
                        <h2>Comments</h2>
                    </div>
                    
                        <ul id="comments">
                            {
                                this.state.comments.map((comment,index) => {
                                    return(<Comment key={index} comment={comment}/>)
                                })
                            }
                        </ul>
                    
                    <div id="postComment">
                        <input
                            id = 'chat-input'
                            value={this.state.comment}
                            placeholder="Comment..."
                            onChange={this.handleCommentChange}
                        />
                        <button onClick={this.postComment}>
                            Post
                        </button>
                    </div>

                </div>
            )
        } else {
            return (
                <div className="commentBox">
                    <div className="details-box-header">
                        <h2>Comments</h2>
                    </div>
                    <div className="commentContainer">

                        <ul id="comments">

                        </ul>

                    </div>
                    <div id="postComment">
                        <input id='chat-input' value={this.state.comment}/>
                        <button></button>
                    </div>

                </div>
            )
        }
    }
}

export default CommentBox;