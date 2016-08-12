import React, { Component } from 'react';

export default class New extends Component {
  render() {
    const styles = require('./New.scss');
    return (
      <div className={styles.container}>
        <input
          className={styles.search}
          type="text"
          placeholder="Buscar usuarix"
        />
      </div>
    );
  }
}
