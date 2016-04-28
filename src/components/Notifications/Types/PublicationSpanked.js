import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Avatar } from '../../';

export default class PublicationSpanked extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <Link className="notifications-list-item-link" to="publication" params={{ id: this.props.data.publication.id }}>
				<Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.interact_user} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> spankeó tu estado: <span className="notification-description">{this.props.data.publication.message}</span>
				</p>
			</Link>
    );
  }
}
