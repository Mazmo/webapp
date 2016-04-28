import React, { Component, PropTypes } from 'react';

export default class ForumRejected extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<img src={this.props.data.forum.icon} alt={this.props.data.forum.title} />
				<p className="notifications-list-item-action">
					Tu membresía para el foro <strong>{this.props.data.forum.title}</strong> ha sido <strong>rechazada</strong>
				</p>
			</a>
    );
  }
}
