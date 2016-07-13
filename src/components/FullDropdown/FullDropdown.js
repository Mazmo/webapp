import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class FullDropdown extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./FullDropdown.scss');
    const mainClasses = classnames({
      [styles.dropdown]: true,
      [styles.active]: this.props.active
    });

    return (
      <div className={mainClasses}>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
