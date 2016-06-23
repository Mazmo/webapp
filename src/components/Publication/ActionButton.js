import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { Icon } from '../';

export default class ActionButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    counter: PropTypes.number,
    active: PropTypes.bool,
    loading: PropTypes.bool,
    action: PropTypes.func
  };

  render() {
    const styles = require('./ActionButton.scss');

    return (
      <span
        className={cn(styles.action, {[styles.active]: this.props.active})}
        onClick={this.props.action}
      >
        <Icon name={this.props.icon} /> {this.props.loading ? '...' : this.props.counter}
      </span>
    );
  }
}
