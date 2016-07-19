import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Modal, Loading, Avatar } from '../../';

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
          {this.props.data && this.props.data.loading &&
            <Loading
              theme={'light'}
              size={'big'}
              position={'absolute'}
            />
          }
          {this.props.data && this.props.data.data &&
            <ul>
              {this.props.data.data.map((reaction, i) => {
                return (
                  <li key={i}>
                    <Avatar
                      user={reaction}
                      size={32}
                    />
                    <Link to={`/${reaction.username}`}>
                      {reaction.displayname}
                    </Link>
                  </li>
                );
              })}
            </ul>
          }
        </div>
      </Modal>
    );
  }
}
