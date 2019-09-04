import React, {Component} from 'react';
import "./eventBoxes.css"

class DetailsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="details-box-container">
                <div className="details-box-header">
                    <h2>Details</h2>
                </div>
                <div className="details-box-content">
                    <div className="detail-item">
                        Created by {this.props.creator}
                    </div>
                    <div className="detail-item">
                        Date: {this.props.date}
                    </div>
                    <div className="detail-item">
                        Location: {this.props.location}
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsBox;