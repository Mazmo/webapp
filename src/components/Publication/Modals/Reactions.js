import React, { Component, PropTypes } from 'react';
import { Modal, Loading } from '../../';

export default class Reactions extends Component {
  static propTypes = {
    data: PropTypes.object,
    close: PropTypes.func.isRequired
  };

  render() {
    // const styles = require('./Reactions.scss');
    return (
      <Modal
        active
        close={this.props.close}
      >
        <div>
          {this.props.data && this.props.data.loading && <Loading />}
          {this.props.data && this.props.data.data &&
            <ul>
              {this.props.data.data.map((reaction, i) => {
                return (
                  <li key={i}>{reaction.displayname}</li>
                );
              })}
            </ul>
          }
        </div>
      </Modal>
    );
  }
}
