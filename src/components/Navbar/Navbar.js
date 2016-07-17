import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';
import { Icon } from '../';

export default class Navbar extends Component {
  static propTypes = {
    mainButton: PropTypes.object.isRequired,
    background: PropTypes.string,
    title: PropTypes.string,
    logo: PropTypes.bool,
    buttons: PropTypes.array
  };

  render() {
    const styles = require('./Navbar.scss');

    return (
      <header className={classnames(styles.header, {[styles.transparent]: this.props.background === 'transparent'})}>
        <div className={styles.container}>

          <button className={styles.button} onClick={this.props.mainButton.action}>
            <Icon className={styles.icon} name={this.props.mainButton.icon} />
          </button>

          <div className={styles.bar}>
            {this.props.title &&
              <div className={styles.title}>{this.props.title}</div>
            }
            {this.props.logo &&
              <div className={styles.logo}></div>
            }
          </div>

          {this.props.buttons &&
            <div className={styles.buttons}>
              {this.props.buttons.map((button, i) => {
                return (
                  <Button
                    key={i}
                    data={button}
                  />
                );
              })}
            </div>
          }

        </div>
    	</header>
    );
  }
}
