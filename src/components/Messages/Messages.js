import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as messagesActions from 'redux/modules/messages';
import { Loading } from '../';
import Message from './Message';

@connect(
  state => ({
    loaded: state.messages.loaded,
    loading: state.messages.loading,
    messages: state.messages.data,
    error: state.messages.error
  }),
  messagesActions)

export default class List extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    messages: PropTypes.array,
    error: PropTypes.string,
    load: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    if (!this.props.loaded && !this.props.loading) {
      this.props.load();
    }
  }

  render() {
    const styles = require('./Messages.scss');

    return (
			<div className={styles.messagesListContainer}>
				{this.props.loading && <Loading />}
				{this.props.loaded &&
          <ul>
            {this.props.messages.map((message, i) => {
              return <Message key={i} data={message} user={this.props.user} />;
            })}
          </ul>
        }
			</div>
    );
  }
}
