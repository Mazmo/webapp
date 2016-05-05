import React, { Component } from 'react';

export default class Notification extends Component {

  render() {
    const styles = require('./Notification.scss');
    return (
      <div className={styles.notification}>
        Alguien ha hecho algo
      </div>
    );
  }
}
