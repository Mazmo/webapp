import React, { Component, PropTypes } from 'react';

export default class PictureModerated extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notifications-list-item-link">
				<p className="notifications-list-item-action">
					Se ha eliminado una de tus fotos; motivo: <strong>{this.props.data.reason}</strong>
				</p>
			</div>
    );
  }
}
