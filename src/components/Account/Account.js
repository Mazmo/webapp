import React, { Component, PropTypes } from 'react';

export default class Account extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Account.scss');
    return (
      <div className={styles.container}>
        <h1>Account</h1>
      </div>
    );
  }
}
