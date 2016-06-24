import React, { Component } from 'react';

export default class Info extends Component {
  render() {
    const styles = require('./Info.scss');
    return (
      <div className={styles.container}>
        <h1>Info</h1>
      </div>
    );
  }
}
