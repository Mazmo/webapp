import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  handleLogIn = () => {
    alert('log in dude!');
  }

  render() {
    return (
      <div className="HOME">
        <Helmet title="Home"/>

        <h1>This is home</h1>
      </div>
    );
  }
}
