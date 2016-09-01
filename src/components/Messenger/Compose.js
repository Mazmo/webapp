import React, { Component, PropTypes } from 'react';
import io from 'utils/socket';

export default class Compose extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    send: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount = () => {
    this.refs.content.focus();

    if (__CLIENT__) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  changed = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      const content = this.refs.content;
      this.props.send(content.value);
      content.value = '';
    } else {
      if (!this.timer) {
        io.emit('messages:typing:start', { id: this.props.id });
      } else {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.stopTyping, 3000);
    }
  }

  stopTyping = () => {
    this.timer = null;
    io.emit('messages:typing:end', { id: this.props.id });
  }

  render() {
    const styles = require('./Compose.scss');
    return (
      <textarea
        ref="content"
        className={styles.container}
        placeholder={`Mensaje a ${this.props.to}`}
        onKeyPress={this.changed}
      />
    );
  }
}
