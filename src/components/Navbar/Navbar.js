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
    title: PropTypes.string,
    action: PropTypes.func.isRequired,
    chgIcon: PropTypes.func.isRequired,
    chgTitle: PropTypes.func.isRequired,
    chgAction: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Navbar.scss');

    return (
      <header className={styles.header}>
        <div className={styles.container}>

          <button className={styles.button} onClick={this.props.action}><Icon className={styles.icon} name={this.props.icon} /></button>

          <div className={styles.bar}>
            {this.props.title &&
              <div className={styles.title}>{this.props.title}</div>
            }
            {!this.props.title &&
              <div className={styles.logo}></div>
            }
            <Dropdown
              name="notifications"
              title="Notificaciones"
              icon="bell"
              counter={this.props.user.alerts_unread}
              chgNavIcon={this.props.chgIcon}
              chgNavTitle={this.props.chgTitle}
              chgNavAction={this.props.chgAction}>
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
