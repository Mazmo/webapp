import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';

export default class List extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./List.scss');
    const classes = {};
    classes[styles.notificationsList] = true;
    classes[styles.visible] = this.props.visible;

    return (
      <div className={classNames(classes)}>
				<h2 className={styles.notificationsListHeader}>Notificaciones</h2>
				<div className={styles.notificationsListContainer}>
					LOADING
				</div>
			</div>
    );
  }
}
