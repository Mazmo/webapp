import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class PublicationCommentSpanked extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.interact_user} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> spankeó tu comentario
				</p>
			</a>
    );
  }
}
