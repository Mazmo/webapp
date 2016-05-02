import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Avatar } from '../';

export default class Message extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  subscribers = (subscribers) => {
    const con = [];

    let j = 0;
    for (let i = 0; i < subscribers.length; i++) {
      const subscriber = subscribers[i];
      // if (subscriber.user.id == AuthStore.getState().currentUser.id) {
      //     continue;
      // }

      con[j] = subscriber.user.displayname;
      j++;
    }

    return con.join(', ');
  }

  render() {
    // const styles = require('./Message.scss');

    return (
      <li>
        <Link className="messages-list-item-link" to="message" params={{message_id: this.props.data.id}}>
  				<Avatar context="messages-list-item-avatar" size={32} user={this.props.data.author} />
  				<p className="messages-list-item-action">
  					<strong>{this.props.data.subject}</strong>
            <span>Con <strong>{this.subscribers(this.props.data.subscribers)}</strong></span>
  				</p>
  			</Link>
			</li>
    );
  }
}
