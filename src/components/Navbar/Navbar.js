import React, { Component, PropTypes } from 'react';
import {
  Icon,
  Notifications,
  Messages
} from '../';
import Dropdown from './Dropdown/Dropdown';

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
              <Notifications user={this.props.user} />
            </Dropdown>
            <Dropdown
              name="messages"
              title="Mensajes"
              icon="message"
              counter={this.props.user.messages_unread}
              chgNavIcon={this.props.chgIcon}
              chgNavTitle={this.props.chgTitle}
              chgNavAction={this.props.chgAction}>
              <Messages user={this.props.user} />
            </Dropdown>
          </div>

        </div>
    	</header>
    );
  }
}
