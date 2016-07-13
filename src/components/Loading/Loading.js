import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Loading extends Component {
  static propTypes = {
    position: PropTypes.string,
    theme: PropTypes.string,
    size: PropTypes.string
  }

  render() {
    const styles = require('./Loading.scss');
    const classes = classnames({
      [styles.loader]: true,
      [styles.loaderPosAbs]: this.props.position === 'absolute',
      [styles.loaderPosRel]: this.props.position === 'relative',
      [styles.loaderLight]: this.props.theme === 'light',
      [styles.loaderDark]: this.props.theme === 'dark',
      [styles.loaderSmall]: this.props.size === 'small',
      [styles.loaderMedium]: this.props.size === 'medium',
      [styles.loaderBig]: this.props.size === 'big'
    });
    return (
      <div className={classes} />
    );
  }
}
