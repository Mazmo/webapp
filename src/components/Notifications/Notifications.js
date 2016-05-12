import React, { Component, PropTypes } from 'react';
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

export default class Notifications extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    notifications: PropTypes.array,
    error: PropTypes.string,
    load: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    if (!this.props.loaded && !this.props.loading) {
      this.props.load();
    }

    this.refs.main.addEventListener('scroll', (e) => {
      if (!this.props.loading && e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight - 40) {
        this.props.load();
      }
    });
  }

  render() {
    const styles = require('./Notifications.scss');

    return (
			<div className={styles.container} ref="main">
        <ul className={styles.notificationsListContainer}>
          {this.props.notifications.map((notification, i) => {
            return (
              <Notification
                key={i}
                data={notification}
                user={this.props.user} />
            );
          })}
        </ul>

        {this.props.loading &&
        <div className={styles.loadingContainer}>
          <Loading theme="dark" size="medium" />
        </div>
        }
			</div>
    );
  }
}
