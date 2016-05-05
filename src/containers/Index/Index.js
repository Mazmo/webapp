import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Home, Landing } from '../';

@connect(
  state => ({
    user: state.auth.user
  }))

export default class Index extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <div>
        {!this.props.user && <Landing />}
        {this.props.user && <Home />}
      </div>
    );
  }
}
