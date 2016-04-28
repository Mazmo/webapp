import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Icon, NotificationsList } from '../';

export default class Notifications extends Component {
  static propTypes = {
    unread: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount = () => {
    if (__CLIENT__) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount = () => {
    if (__CLIENT__) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  handleClickOutside = (evnt) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (this.state.active && (!domNode || !domNode.contains(evnt.target))) {
      this.toggle();
    }
  }

  toggle = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    const styles = require('./Notifications.scss');

    return (
      <div className={styles.notifications} title="Notificaciones">
          <div onClick={this.toggle}>
              <Icon name="bell" />
          </div>
          <span className={styles.notificationsCounter}>{this.props.unread}</span>
          <NotificationsList visible={this.state.active} />
      </div>
    );
  }
}
