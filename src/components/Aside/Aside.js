import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import {
  Icon
} from '../';

export default class Aside extends Component {
  static propTypes = {
    user: PropTypes.object,
    visible: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./Aside.scss');
    const classes = {};
    classes[styles.visible] = this.props.visible;

    return (
      <aside className={classnames(styles.aside, styles.left, classes)}>
				<nav className="nav on-aside">
					<Link className="nav-link home" to="home">
						<Icon name="home" />
					</Link>
					<Link className="nav-link forums" to="forums">
						<Icon name="forums" />
					</Link>
					<a className="nav-link events" href="#">
						<Icon name="events" />
					</a>
					<a className="nav-link chat" href="#">
						<Icon name="chat" />
					</a>
					<a className="nav-link contacts" href="#">
						<Icon name="contacts" />
					</a>
				</nav>
			</aside>
    );
  }
}
