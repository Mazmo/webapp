import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { send } from 'redux/modules/messages';
import Message from 'components/Messenger/Message';
import Compose from 'components/Messenger/Compose';
import Loading from 'components/Loading/Loading';

@connect(
  state => ({
    loaded: state.messages.loaded,
    chats: state.messages.chats,
    users: state.users,
    me: state.auth.user
  }), { send })
export default class Messenger extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    chats: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    me: PropTypes.object.isRequired,
    params: PropTypes.object,
    send: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  }

  getUser = () => {
    const chat = this.props.chats[this.props.params.id];
    if (chat.users[0].id !== this.props.me.id) {
      if (!this.props.users[chat.users[0].username]) {
        return chat.users[0].username;
      }
      return this.props.users[chat.users[0].username].displayname;
    }
    if (!this.props.users[chat.users[1].username]) {
      return chat.users[1].username;
    }
    return this.props.users[chat.users[1].username].displayname;
  }

  scrollToBottom = () => {
    if (__CLIENT__) {
      window.scrollTo(0, document.body.scrollHeight);
    }
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
      <div className={styles.container}>
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
          to={user}
          send={this.send}
        />
      </div>
    );
  }
}
