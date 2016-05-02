import React, { Component, PropTypes } from 'react';
// import {
//   Icon,
//   Avatar
// } from '../';

export default class Aside extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    // const styles = require('./Navbar.scss');

    return (
      <div>
        User: {this.props.user.display_naem}
        Aside
      </div>
    );
  }
}
