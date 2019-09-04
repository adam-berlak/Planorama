import React, {Component} from 'react';
import "./eventBoxes.css"

class DescriptionBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="details-box-container">
                <div className="details-box-header">
                    <h2>Description</h2>
                </div>
                <div className="details-box-content">
                    {this.props.description}
                </div>
            </div>
        )
    }
}

export default DescriptionBox;