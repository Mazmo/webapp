import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Icon } from '../../';

export default class Dropdown extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    updateState: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggle = () => {
    this.props.updateState({
      title: (!this.state.active ? 'Notificaciones' : ''),
      hasBack: !this.state.active
    });
    this.setState({ active: !this.state.active });
  }

  render() {
    const styles = require('./Dropdown.scss');
    const classes = {};

    classes[styles.dropdown] = true;
    classes[styles.active] = this.state.active;

    return (
      <div className={classnames(classes)}>
        <Icon className={styles.icon} name={this.props.icon} onClick={this.toggle} />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
