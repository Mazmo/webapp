import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
  static propTypes = {
    size: PropTypes.number,
    user: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
				AVATAR
			</div>
    );
  }
}
