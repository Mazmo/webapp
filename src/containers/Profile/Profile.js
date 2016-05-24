import React, { Component, PropTypes } from 'react';

export default class Profile extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };


  render() {
    const styles = require('./Profile.scss');
    return (
      <div className={styles.container}>
        <h1>Profile</h1>
      </div>
    );
  }
}
