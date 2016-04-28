import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
  static propTypes = {
    size: PropTypes.number,
    user: PropTypes.object.isRequired
  };

  render() {
    const size = this.props.size ? this.props.size : 32;
    const src = this.props.user.avatar.replace('150x150', size + 'x' + size);
    return (
      <div>
				<img src={src} width={size} height={size} />
			</div>
    );
  }
}
