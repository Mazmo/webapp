import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cn from 'classnames';
import EmojiPicker from 'emojione-picker';
import { send, read } from 'redux/modules/messages';
import Message from 'components/Messenger/Message';
import Compose from 'components/Messenger/Compose';
import Loading from 'components/Loading/Loading';

@connect(
  state => ({
    loaded: state.messages.loaded,
    chats: state.messages.chats,
    users: state.users,
    me: state.auth.user
  }), { send, read })
export default class Messenger extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    chats: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    me: PropTypes.object.isRequired,
    params: PropTypes.object,
    send: PropTypes.func.isRequired,
    read: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      emojiPicker: false
    };
  }

  componentDidMount = () => {
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
    this.handleRead();
  }

  getUser = () => {
    const chat = this.props.chats[this.props.params.id];
    const userId = chat.participants[0] !== this.props.me.id ? chat.participants[0] : chat.participants[1];

    if (!this.props.users[chat.users[userId].username]) {
      return chat.users[userId].username;
    }
    return this.props.users[chat.users[userId].username].displayname;
  }

  handleRead = () => {
    if (this.props.chats[this.props.params.id] && this.props.chats[this.props.params.id].users[this.props.me.id].unread) {
      this.props.read(this.props.params.id);
    }
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  toggleEmojiPicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker });
  }

  emojiSelected = (data) => {
    const el = this.refs.compose.refs.content;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const original = el.value;
    const newval = original.substr(0, start) + data.shortname + original.substr(end);

    el.value = newval;
    el.focus();
    this.setState({ emojiPicker: false });
  }

  send = (content) => {
    this.props.send(this.props.params.id, content);
  }

  render() {
    if (!this.props.loaded) {
      return <Loading />;
    }

    const styles = require('./Messenger.scss');
    const chat = this.props.chats[this.props.params.id];
    const user = this.getUser();

    return (
      <div className={styles.container} onFocus={this.handleRead}>
        <Helmet title={`Chat con ${user}`} />
        <ul className={styles.messages}>
          {chat.messages.map((message, i) => {
            const author = this.props.users[message.author.username] ? this.props.users[message.author.username] : message.author;
            return (
              <Message
                key={i}
                data={message}
                author={this.props.me.id !== message.author.userId ? author : null}
                me={this.props.me}
              />
            );
          })}
        </ul>
        <Compose
          ref="compose"
          to={user}
          send={this.send}
        />
        <img
          className={cn(styles.emojiTrigger, { [styles.selected]: this.state.emojiPicker })}
          src="http://cdn.jsdelivr.net/emojione/assets/png/1f600.png?v=2.2.6"
          onClick={this.toggleEmojiPicker}
        />
        {this.state.emojiPicker &&
          <EmojiPicker
            onChange={this.emojiSelected}
          />
        }
      </div>
    );
  }
}
