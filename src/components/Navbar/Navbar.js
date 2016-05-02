import React, { Component, PropTypes } from 'react';
import {
  Icon,
  Notifications
} from '../';

export default class Navbar extends Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    user: PropTypes.object
  };

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
        <div className={styles.header.container}>
          {this.props.hasBack &&
            <button className={styles.iconButton} onClick={this.goBack}><Icon className={styles.iconNav} name="back" /></button>
          }
          {!this.props.hasBack &&
            <button className={styles.iconButton} onClick={this.goNav}><Icon className={styles.iconNav} name="nav" /></button>
          }
          <a className={styles.logo}></a>
          <div className={styles.bar}>
            <Notifications unread={this.props.user.alerts_unread} />
            {/* <Messages /> */}
            <div className={styles.bar_menu}>
                {/* <Avatar context="header-bar-menu-avatar" size="32" user={this.props.user} /> */}
            </div>
          </div>
        </div>
    	</header>
    );
  }
}
