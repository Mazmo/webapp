import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import {
  Icon,
  Avatar
} from '../';

export default class Aside extends Component {
  static propTypes = {
    user: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  componentDidMount = () => {
    const el = this.refs.aside;

    el.addEventListener('transitionend', () => {
      console.log('transition end');
      this.setState({ transitioning: false });
    });
    el.addEventListener('transitionstart', () => {
      console.log('transition start');
      this.setState({ transitioning: true });
    });

    document.addEventListener('click', (event) => {
      const isClickInside = el.contains(event.target);

      if (!isClickInside && this.props.visible && !this.state.transitioning) {
        console.log(el.style);
        // this.props.toggle();
      }
    });
  }

  render() {
    const styles = require('./Aside.scss');
    const classes = {};
    classes[styles.navOpen] = this.props.visible;

    return (
      <nav className={classnames(styles.nav, classes)} ref="aside">
				<div className={styles.headerProfile}>
					<Avatar size={100} user={this.props.user} />
					<ul className={styles.stats}>
						<li>NaN <i>Seguidores</i></li>
						<li>NaN <i>Siguiendo</i></li>
						<li>NaN <i>Conocidos</i></li>
					</ul>
				</div>
				<ul className={styles.navLinks}>
					<li>
						<Link className={classnames(styles.navLink, styles.home)} to="/">
							<Icon name="home" />
							<span className="">Inicio</span>
						</Link>

						<Link className={classnames(styles.navLink, styles.home)} to="/forums">
							<Icon name="forums" />
							<span className="">Foros</span>
						</Link>

						<Link className={classnames(styles.navLink, styles.home)} to="/home">
							<Icon name="events" />
							<span className="">Eventos</span>
						</Link>

						<Link className={classnames(styles.navLink, styles.home)} to="/home">
							<Icon name="contacts" />
							<span className="">Tu vieja</span>
						</Link>
					</li>
				</ul>

			</nav>
    );
  }
}
