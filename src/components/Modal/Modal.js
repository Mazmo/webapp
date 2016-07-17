import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { Navbar } from '../';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    close: PropTypes.func,
    buttons: PropTypes.array
  };

  render() {
    const styles = require('./Modal.scss');

    return (
      <div className={cn(styles.modal, { [styles.active]: this.props.active })}>
        <Navbar
          background="transparent"
          mainButton={{icon: 'back', action: this.props.close}}
        />

        <div className="content">
          <div>
            {this.props.children}
          </div>
          {this.props.buttons &&
            <div>
              {this.props.buttons.map((button) => {
                return (
                  <button onClick={button.action}>{button.label}</button>
                );
              })}
            </div>
          }
        </div>
      </div>
    );
  }
}
