import React, { Component } from 'react';
import './BlueHeaderBox.css'

class BlueHeaderBox extends Component {
  render() {
    return (
      <div className="blue-header-box">
        <div className="blue-box-nav"><h1>{this.props.title}</h1></div>
          <div className="blue-box-content">
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default BlueHeaderBox;
