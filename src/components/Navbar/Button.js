import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Icon } from '../';

export default class Button extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Button.scss');
    const buttonClasses = classnames({
      [styles.button]: true,
      [styles.active]: this.props.data.active
    });

    return (
      <button
        className={buttonClasses}
        onClick={this.props.data.action}
        >
        <Icon name={this.props.data.icon} />
        {this.props.data.badge && <span className={styles.counter}>{this.props.data.badge}</span>}
      </button>
    );
  }
}
