import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as notificationsActions from 'redux/modules/notifications';
import { Loading } from '../';
import Notification from './Notification';

@connect(
  state => ({
    loaded: state.notifications.loaded,
    loading: state.notifications.loading,
    notifications: state.notifications.data,
    error: state.notifications.error
  }),
  notificationsActions)

export default class List extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    notifications: PropTypes.array,
    error: PropTypes.string,
    load: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    if (!this.props.loaded && !this.props.loading) {
      this.props.load();
    }
  }

  render() {
    const styles = require('./List.scss');
    const classes = {};
    classes[styles.notificationsList] = true;
    classes[styles.visible] = this.props.visible;

    return (
      <div className={classNames(classes)}>
				<h2 className={styles.notificationsListHeader}>Notificaciones</h2>
				<div className={styles.notificationsListContainer}>
					{this.props.loading && <Loading />}
					{this.props.loaded &&
            <ul>
              {this.props.notifications.map((notification, i) => {
                return <Notification key={i} data={notification} />;
              })}
            </ul>
          }
				</div>
			</div>
    );
  }
}
