import React, { Component, PropTypes } from 'react';

export default class Compose extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    send: PropTypes.func.isRequired
  };

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
    }
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
