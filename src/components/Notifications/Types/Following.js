import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class Following extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notifications-list-item-link">
				<Avatar size="32" user={this.props.data.interact_user} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> ahora te está siguiendo
				</p>
			</div>
    );
  }
}
