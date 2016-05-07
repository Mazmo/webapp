import React, { Component } from 'react';

export default class Notification extends Component {

  render() {
    const styles = require('./Notification.scss');
    return (
      <div className={styles.notification}>
        <img className={styles.image} src="https://randomuser.me/api/portraits/med/men/11.jpg" />
        <p className={styles.text}>
          <strong className={styles.nick}>Obama</strong> ha comentado tu publicación
          <time className={styles.time}>hace 5 minutos</time>
        </p>
      </div>
    );
  }
}
