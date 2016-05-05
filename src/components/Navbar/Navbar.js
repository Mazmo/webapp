import React, { Component, PropTypes } from 'react';
import {
  Icon /* ,
  Avatar,
  Notifications,
  Messages */
} from '../';
import Dropdown from './Dropdown/Dropdown';
import Notification from './Notification/Notification';

export default class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    icon: PropTypes.string.isRequired,
    logo: PropTypes.bool.isRequired,
    title: PropTypes.string,
    chgIcon: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      hasBack: false,
      title: ''
    };
  }

  updateState = (state) => {
    this.setState(state);
  }

  goBack = () => {
    // this.history.goBack();
  }

  goNav = () => {
    // this.props.toggleNav();
  }

  render() {
    const styles = require('./Navbar.scss');

    return (
      <header className={styles.header}>
        <div className={styles.container}>

          <button className={styles.button} onClick={this.goBack}><Icon className={styles.icon} name={this.props.icon} /></button>

          <div className={styles.bar}>
            <div className={styles.logo}></div>
            <Dropdown name="notifications" icon="bell" counter={this.props.user.alerts_unread} updateState={this.updateState}>
              <Notification />
            </Dropdown>
            <div className={styles.messages}></div>
            <div className={styles.menu}></div>
          </div>

          {/* <div className={styles.bar}>
            <Notifications unread={this.props.user.alerts_unread} />
            <Messages />
            <div className={styles.bar_menu}>
              <Avatar context="header-bar-menu-avatar" size={32} user={this.props.user} />
            </div>
          </div> */}

        </div>
    	</header>
    );
  }
}
