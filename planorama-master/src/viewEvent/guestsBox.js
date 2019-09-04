import React, {Component} from 'react';
import "./eventBoxes.css"

class GuestsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {showInviteDialog:false,
                        username_field:''};
        this.handleInviteDialog = this.handleInviteDialog.bind(this);

    }

    componentDidMount() {
        console.log(this.props);
    }


    handleInviteDialog() {
        if(this.state.showInviteDialog && this.state.username_field.length > 0) {
            this.props.invite(this.state.username_field);
        }
        this.setState((prevState => {
            return {showInviteDialog: !prevState.showInviteDialog,
                    username_field: ''}
        }));
    }

    render() {
        let guests = this.props.data.userlist;
        console.log(guests);


        if (typeof guests === 'undefined'){
            return (
                <div className="details-box-container">
                    <div className="details-box-header">
                        <h2>Guests</h2>
                    </div>
                    <div className="details-box-content">

                    </div>
                </div>
            )
        } else {
            if (this.state.showInviteDialog) {
                return (

                    <div className="details-box-container">
                        <div className="details-box-header">
                            <h2>Guests</h2>
                        </div>
                        <div className="details-box-content">
                            <ul>
                                {
                                    guests.map((guest, index) => {
                                        return (<li className="details-box-content"
                                                    key={index}>{guest.username} ({guest.status}) </li>)
                                    })
                                }
                            </ul>
                            <input type="text" placeholder="username you wish to invite"
                                   value={this.state.username_field} onChange={e => this.setState({ username_field: e.target.value })}/>
                            <button className="details-box-content" onClick={this.handleInviteDialog}>
                                Invite
                            </button>

                        </div>
                    </div>
                )
            } else {

                return (

                    <div className="details-box-container">
                        <div className="details-box-header">
                            <h2>Guests</h2>
                        </div>
                        <div className="details-box-content">
                            <ul>
                                {
                                    guests.map((guest, index) => {
                                        return (<li className="details-box-content"
                                                    key={index}>{guest.username} ({guest.status}) </li>)
                                    })
                                }
                            </ul>
                            <button className="details-box-content" onClick={this.handleInviteDialog}>
                                Invite
                            </button>

                        </div>
                    </div>
                )
            }
        }

    }
}

export default GuestsBox;