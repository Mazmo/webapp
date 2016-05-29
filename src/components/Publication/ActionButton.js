import React, { Component, PropTypes } from 'react';
import { Icon } from '../';

export default class ActionButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    counter: PropTypes.number,
    active: PropTypes.bool
  };

  render() {
    const styles = require('./ActionButton.scss');
    console.log(this.props.active);
    return (
      <span className={styles.action} onClick={this._toggleComments}>
        <Icon name={this.props.icon} /> {this.props.counter}
      </span>
    );
  }
}
