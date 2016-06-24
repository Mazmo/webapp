import React, { Component, PropTypes } from 'react';
import { Icon } from '../';

export default class LoadMoreComments extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    showAll: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./LoadMoreComments.scss');

    return (
      <button className={styles.loadMore} onClick={this.props.showAll}>
        <Icon className={styles.icon} name="comments" />
        <span className={styles.label}>{'Ver los primeros ' + this.props.count + ' comentarios'}</span>
      </button>
    );
  }
}
