import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class RelationshipCancelled extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.interact_user} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> ha indicado que ya no tiene una relación contigo
				</p>
			</a>
    );
  }
}
