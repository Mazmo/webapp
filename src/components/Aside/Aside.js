import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import {
  Icon
} from '../';

export default class Aside extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const styles = require('./Aside.scss');

    return (
      <aside className={classnames(styles.aside, styles.left)}>
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
