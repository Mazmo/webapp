import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class ChatRoomInvite extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.chat_room_invite.invited_by} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.chat_room_invite.invited_by.displayname}</strong> te ha invitado a la sala de chat <strong>{this.props.data.chat_room_invite.room.name}</strong>
				</p>
			</a>
    );
  }
}
