import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Icon } from '../../';

export default class Dropdown extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    chgNavIcon: PropTypes.func.isRequired,
    chgNavTitle: PropTypes.func.isRequired,
    chgNavAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggle = () => {
    const active = !this.state.active;
    const icon = active ? 'back' : 'nav';
    const title = active ? this.props.title : null;
    const action = active ? this.toggle : null;

    this.props.chgNavIcon(icon);
    this.props.chgNavTitle(title);
    this.props.chgNavAction(action);
    this.setState({ active });
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
