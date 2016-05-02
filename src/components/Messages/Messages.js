import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../';
import MessagesList from './List';

export default class Messages extends Component {
  static propTypes = {
    unread: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount = () => {
    if (__CLIENT__) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount = () => {
    if (__CLIENT__) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  handleClickOutside = (evnt) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (this.state.active && (!domNode || !domNode.contains(evnt.target))) {
      this.toggle();
    }
  }

  toggle = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    const styles = require('./Messages.scss');

    return (
      <div className={styles.messages} title="Mensajes">
        <div onClick={this.toggle}>
            <Icon name="message" />
        </div>
        <span className={styles.notificationsCounter}>{this.props.unread}</span>
        <MessagesList visible={this.state.active} />
      </div>
    );
  }
}
