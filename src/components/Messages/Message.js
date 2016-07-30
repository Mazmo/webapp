import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load } from 'redux/modules/users';
import { Avatar } from 'components';

@connect(
  state => ({
    me: state.auth.user,
    users: state.users
  }), { load })
class Message extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    me: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  };

  open = () => {
    // Use for desktop only
    this.props.open(this.props.data.id);
  }

  title = () => {
    const users = [];
    this.props.data.users.map((user) => {
      if (user.id !== this.props.me.id) {
        if (!this.props.users[user.username]) {
          this.props.load(user.username);
          users.push(user.username);
        } else {
          users.push(this.props.users[user.username].displayname);
        }
      }
    });

    if (users.length === 0) {
      return '';
    }
    return users.join(', ');
  }

  avatarUser = () => {
    if (this.props.data.users[0].id === this.props.me.id) {
      return this.props.users[this.props.data.users[1].username];
    }

    return this.props.users[this.props.data.users[0].username];
  }

  render() {
    const styles = require('../Notifications/Notification.scss');
    const avatarUser = this.avatarUser();
    const messages = this.props.data.messages;
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

    return (
      <Link to={`/messenger/${this.props.data.id}`} className={styles.notification}>
        {avatarUser && <Avatar className={styles.image}size={100} user={avatarUser} />}
        <p className={styles.text}>
          <strong className={styles.nick}>{this.title()}</strong><br />
          {lastMessage && lastMessage.content && <span className={styles.notificationDescription}>{lastMessage.content}</span>}
          {lastMessage && lastMessage.createdAt && <time className={styles.time}><FormattedRelative value={lastMessage.createdAt} /></time>}
        </p>
      </Link>
    );
  }
}

export default injectIntl(Message);
