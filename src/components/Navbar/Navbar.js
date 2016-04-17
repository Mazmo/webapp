import React, { Component, PropTypes } from 'react';
import { Icon } from '../';

export default class Navbar extends Component {
  static propTypes = {
    hasBack: PropTypes.bool
  };

  goBack = () => {
    // this.history.goBack();
  }

  goNav = () => {
    // this.props.toggleNav();
  }

  render() {
    const styles = require('./Navbar.scss');

    let IconButton;
    if (this.props.hasBack) {
      IconButton = <button className="header-icon-button" onClick={this.goBack}><Icon className="header-icon-nav" name="back" /></button>;
    } else {
      IconButton = <button className="header-icon-button" onClick={this.goNav}><Icon className="header-icon-nav" name="nav" /></button>;
    }
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          {IconButton}
          <a className={styles.logo}></a>
          <div className={styles.bar}>
            {/* <Notifications /> */}
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
