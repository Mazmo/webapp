import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Account from 'components/Account/Account';

@connect(
  state => ({
    profile: state.auth.user
  })
)
export default class AccountContainer extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    return (
      <Account
        profile={this.props.profile}
      />
    );
  }
}
