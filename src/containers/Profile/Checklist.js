import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([
  {
    deferred: false,
    key: 'profile',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}`)
  }
])

export default class Checklist extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  render() {
    const styles = require('./Checklist.scss');
    // const user = this.props.profile;

    return (
      <div className={styles.checklist}>
        <h1>Checklist</h1>
      </div>
    );
  }
}
