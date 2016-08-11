import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import emojione from 'emojione';
import Avatar from 'components/Avatar/Avatar';

export default class Message extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    author: PropTypes.object
  };

  render() {
    const styles = require('./Message.scss');
    const parsedText = emojione.shortnameToImage(this.props.data.content);

    return (
      <li className={cn(styles.message, {[styles.createdByMe]: !this.props.author, [styles.sending]: this.props.data.sending})}>
        {this.props.author && this.props.author.avatar && <Avatar className={styles.avatar} size={32} user={this.props.author} />}
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: parsedText}} />
      </li>
    );
  }
}
