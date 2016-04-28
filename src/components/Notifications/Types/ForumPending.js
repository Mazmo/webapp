import React, { Component, PropTypes } from 'react';

export default class ForumPending extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<img src={this.props.data.forum.icon} alt={this.props.data.forum.title} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.displayname}</strong> ha solicitado una membresía en <strong>{this.props.data.forum.title}</strong>
				</p>
			</a>
    );
  }
}
