import React, { Component, PropTypes } from 'react';

export default class DeletedPost extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notifications-list-item-link">
				<p className="notifications-list-item-action">
					Se te ha eliminado un post en el hilo {this.props.data.post.thread.title}; motivo: <strong>{this.props.data.post.deleted_reason}</strong>
				</p>
			</div>
    );
  }
}
