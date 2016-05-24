import React, { Component, PropTypes } from 'react';

export default class ContextMenu extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };


  render() {
    const styles = require('./ContextMenu.scss');
    return (
      <div className={styles.container}>
        <h1>ContextMenu</h1>
      </div>
    );
  }
}
