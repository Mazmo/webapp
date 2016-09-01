import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as messagesActions from 'redux/modules/messages';
import { Loading } from '../';
import Message from './Message';

@connect(
  state => ({
    loaded: state.messages.loaded,
    loading: state.messages.loading,
    list: state.messages.list,
    chats: state.messages.chats,
    error: state.messages.error
  }),
  messagesActions)

export default class Messages extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array,
    chats: PropTypes.object,
    error: PropTypes.string,
    load: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    if (!this.props.loaded && !this.props.loading) {
      this.props.load();
    }
  }

  handleClick = (e) => {
    if (e.target.closest('a')) {
      this.props.toggle();
    }
  }

  render() {
    const styles = require('../Notifications/Notifications.scss');

    return (
      <div className={styles.container} ref="main" onClick={this.handleClick}>
				{this.props.loading && <Loading position="absolute" size="medium" theme="dark" />}
        {this.props.error &&
          <div>Ocurrió un error: {this.props.error}</div>
        }
				{this.props.loaded &&
          <div>
            <div className={styles.topOptions}>
              <Link to={`/messenger/new`}>Nueva conversación</Link>
            </div>
            <ul className={styles.notificationsListContainer}>
              {this.props.list.map((id, i) => {
                return (
                  <Message
                    key={i}
                    data={this.props.chats[id]}
                    open={this.props.open}
                  />
                );
              })}
            </ul>
          </div>
        }
      </div>
    );
  }
}
