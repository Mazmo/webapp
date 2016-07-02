import React, { Component, PropTypes } from 'react';
import { Modal } from '../../';

export default class Reactions extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired
  };

  clos

  render() {
    // const styles = require('./Reactions.scss');
    return (
      <Modal
        active
        close={this.props.close}
      >
        <h1>Reactions</h1>
      </Modal>
    );
  }
}
