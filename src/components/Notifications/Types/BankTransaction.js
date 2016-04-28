import React, { Component, PropTypes } from 'react';
import { Avatar } from '../../';

export default class BankTransaction extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <a className="notifications-list-item-link" href="#">
        <Avatar context="notifications-list-item-avatar" size={32} user={this.props.data.transaction.from} />
				<p className="notifications-list-item-action">
					<strong>{this.props.data.transaction.from.display_name}</strong> te ha depositado la suma de <strong>§{this.props.data.transaction.amount} SADEs</strong>
				</p>
			</a>
    );
  }
}
