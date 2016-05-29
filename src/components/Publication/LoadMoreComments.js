import React, { Component, PropTypes } from 'react';
import { Icon } from '../';

export default class LoadMoreComments extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired
  };

  render() {
    const styles = require('./LoadMoreComments.scss');

    return (
      <span className={styles.loadMore}>
        <Icon className={styles.icon} name="comments" /> Ver los primeros {this.props.count} comentarios
      </span>
    );
  }
}
