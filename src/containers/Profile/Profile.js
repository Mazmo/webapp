import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    const styles = require('./Profile.scss');
    return (
      <div className={styles.container}>
        <h1>Profile</h1>
      </div>
    );
  }
}
