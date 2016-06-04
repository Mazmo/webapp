import React, { Component, PropTypes } from 'react';
import { Avatar } from '../';

export default class CreateComment extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired
  };

  keyUp = (e) => {
    console.log(e);
  }

  render() {
    const styles = require('./CreateComment.scss');
    return (
      <form className={styles.create}>
        <Avatar className={styles.createAvatar} size={32} user={this.props.me} />
        <textarea
          className={styles.createTextarea}
          ref="commentcontainer"
          placeholder="Escribe un comentario"
          onKeyUp={this.keyUp}
        ></textarea>
      </form>
    );
  }
}
