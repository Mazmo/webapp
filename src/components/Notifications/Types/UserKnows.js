import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class UserKnows extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notifications-list-item-link">
				<Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.interact_user} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> ha indicado que te conoce personalmente
				</p>
			</div>
    );
  }
}
