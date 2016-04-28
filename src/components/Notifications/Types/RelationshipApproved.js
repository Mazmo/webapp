import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class RelationshipApproved extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.interact_user} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> te ha aceptado como su <strong>{this.props.data.relationship.type.text}</strong>
				</p>
			</a>
    );
  }
}
