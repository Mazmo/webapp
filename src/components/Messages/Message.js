import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/modules/users';
import { Avatar } from 'components';

@connect(
  state => ({
    me: state.auth.user,
    users: state.users
  }), { load })
export default class Message extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    me: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired
  };

  open = () => {
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
    const styles = require('./Message.scss');
    const avatarUser = this.avatarUser();

    return (
      <li className={styles.message} onClick={this.open}>
				{avatarUser && <Avatar context="messages-list-item-avatar" size={32} user={avatarUser} />}
				<p className="messages-list-item-action">
					<strong>{this.title()}</strong>
          <span>{this.props.data.lastMessage}</span>
				</p>
			</li>
    );
  }
}
