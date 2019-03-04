import React, {Component} from 'react';

import './index.less'

export default class MyButton extends Component {
  render () {
    return (
       <button onClick={this.props.onClick} className="myButton" style={this.props.style}>{this.props.name}</button>
    )
  }
}