import React, { Component, PropTypes } from 'react';

export default class SadesAssign extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
				<p className="notifications-list-item-action">
					Se te han asignado SADEs gracias a tu actividad semanal. El balance de tu cuenta ahora es de <strong>§{this.props.data.user.sades}</strong>
				</p>
			</a>
    );
  }
}
