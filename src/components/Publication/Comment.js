import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Avatar, Icon } from '../';

export default class Comment extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Comment.scss');
    return (
      <li className={styles.comment}>
        <Avatar className={styles.commentAvatar} size={32} user={this.props.data.user} />
        <p className={styles.commentContent}>
          <Link className={styles.commentContentAuthor} to={`/${this.props.data.user.username}`}>{this.props.data.user.displayname}</Link>
          {this.props.data.comment}
        </p>
        <span className={styles.commentDate}>{/* moment(this.props.data.created_at.date).fromNow() */}</span>
        <button onClick={this.spankHandler} title={this.props.data.isSpanked ? 'Quitar spank' : 'Spank it'}>
          <Icon className={styles.commentSpankIcon} name="spank" />
          {this.props.data.spank_count > 0 ? this.props.data.spank_count : null}
        </button>
      </li>
    );
  }
}
