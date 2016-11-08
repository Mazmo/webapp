import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([
  {
    deferred: false,
    key: 'checklist',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}/checklist`).catch((error) => error).then((response) => response)
  }
])

export default class Checklist extends Component {

  static propTypes = {
    checklist: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Checklist.scss');
    if (this.props.checklist.error) {
      return <div>ERROR: {this.props.checklist.error}</div>;
    }

    return (
      <div className={styles.checklist}>
        <pre>{JSON.stringify(this.props.checklist.results, null, 2)}</pre>
      </div>
    );
  }
}
