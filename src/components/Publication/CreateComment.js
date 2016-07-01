import React, { Component, PropTypes } from 'react';
import { Avatar } from '../';

export default class CreateComment extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  changed = (e) => {
    const keyCode = (e.keyCode || e.which);
    const message = this.refs.message.value;

    if (keyCode === 13 && !e.shiftKey && message.length > 0) {
      e.preventDefault();
      this.props.createComment(message);
      this.refs.form.reset();
    }
  }

  render() {
    const styles = require('./CreateComment.scss');
    return (
      <form className={styles.create} ref="form">
        <Avatar className={styles.createAvatar} size={32} user={this.props.me} />
        <textarea
          className={styles.createTextarea}
          ref="message"
          placeholder="Escribe un comentario"
          onKeyPress={this.changed}
          disabled={this.props.disabled}
        ></textarea>
      </form>
    );
  }
}
