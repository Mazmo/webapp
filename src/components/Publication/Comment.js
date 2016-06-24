import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Avatar, Icon } from '../';
import classNames from 'classnames';

export default class Comment extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    react: PropTypes.func.isRequired
  };

  react = () => {
    this.props.react(this.props.data.id, 'SPANK');
  }

  render() {
    const styles = require('./Comment.scss');
    const data = this.props.data;
    const user = data.user;
    const spankLabel = data.is_spanked ? 'Quitar spank' : 'Spank it';
    const spankCount = data.spank_count > 0 ? data.spank_count : null;

    return (
      <li className={styles.comment}>
        <Avatar className={styles.avatar} size={32} user={user} />
        <div className={styles.content}>
          <div className={styles.top}>
            <Link className={styles.author} to={'/' + user.username}>{user.displayname}</Link>
            <span className={styles.text}>{data.comment}</span>
          </div>
          <div className={styles.bottom}>
            <button className={classNames(styles.spankButton, {[styles.spanked]: data.is_spanked})} onClick={this.react} title={spankLabel}>
              <Icon className={styles.spankIcon} name="spank" />
              {data.reacting && '...'}
              <span className={styles.spankLabel}>{spankCount}</span>
            </button>
          </div>
        </div>
      </li>
    );
  }
}
