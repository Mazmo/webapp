import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ContextMenu extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./ContextMenu.scss');
    const classes = {};
    classes[styles.visible] = this.props.visible;

    return (
      <div className={classnames(styles.contextMenu, classes)}>
        {this.props.children}
      </div>
    );
  }
}
