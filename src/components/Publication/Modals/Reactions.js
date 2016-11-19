import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Modal, Loading, Avatar } from '../../';

export default class Reactions extends Component {
  static propTypes = {
    data: PropTypes.object,
    close: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Reactions.scss');

    return (
      <Modal active close={this.props.close}>
        {this.props.data && this.props.data.loading &&
          <Loading theme="light" size="big" position="absolute" />
        }
        {this.props.data && this.props.data.data &&
          <ul className={styles.list}>
            {this.props.data.data.map((user, i) => (
              <li className={styles.item} key={i}>
                <Avatar className={styles.avatar} user={user} size={60} />
                <Link className={styles.link} to={`/${user.username}`}>{user.displayname}</Link>
              </li>
            ))}
          </ul>
        }
      </Modal>
    );
  }
}
