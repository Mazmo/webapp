import React, { Component, PropTypes } from 'react';

export default class PageRecommend extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="notifications-list-item-link">
				<img src={this.props.data.page.avatar} alt={this.props.data.page.name} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.interact_user.display_name}</strong> te recomienda que sigas la página <strong>{this.props.data.page.name}</strong>
				</p>
			</div>
    );
  }
}
