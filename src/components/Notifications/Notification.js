import React, { Component, PropTypes } from 'react';

export default class Notification extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    let Alert;
    switch (this.props.data.type) {
      case 999999:
        Alert = require('./Types/Following');
        break;
      default:
        Alert = require('./Types/Unknown');
    }

    return <Alert data={this.props.data} />;
  }
}
