import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Loading extends Component {
  static propTypes = {
    position: PropTypes.string,
    theme: PropTypes.string,
    size: PropTypes.string
  }

  render() {
    const styles = require('./Loading.scss');
    const classSet = {};
    classSet[styles.loader] = true;
    classSet[styles.loaderPosAbs] = this.props.position === 'absolute';
    classSet[styles.loaderPosRel] = this.props.position === 'relative';
    classSet[styles.loaderLight] = this.props.theme === 'light';
    classSet[styles.loaderDark] = this.props.theme === 'dark';
    classSet[styles.loaderSmall] = this.props.size === 'small';
    classSet[styles.loaderMedium] = this.props.size === 'medium';
    classSet[styles.loaderBig] = this.props.size === 'big';
    return (
      <div className={classNames(classSet)} />
    );
  }
}
