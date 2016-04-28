import React, { Component, PropTypes } from 'react';

export default class ForumModerator extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<img src={this.props.data.forum.icon} alt={this.props.data.forum.title} width={32} height={32} />
				<p className="notifications-list-item-action">
					Ahora tienes permisos de administración en el foro <strong>{this.props.data.forum.title}</strong>
				</p>
			</a>
    );
  }
}
