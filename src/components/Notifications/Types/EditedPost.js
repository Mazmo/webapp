import React, { Component, PropTypes } from 'react';

export default class EditedPost extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notifications-list-item-link">
				<p className="notifications-list-item-action">
					Se te ha editado un post en el hilo {this.props.data.post.thread.title}; motivo: <strong>{this.props.data.post.edited_reason}</strong>
				</p>
			</div>
    );
  }
}
