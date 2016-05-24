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

    document.addEventListener('click', (event) => {
      const isClickInside = el.contains(event.target);
      const matrix = getComputedStyle(el).transform.split(', ');

      if (!isClickInside && this.props.visible && parseInt(matrix[4], 10) === 0) {
        this.props.toggle();
      }
    });
  }

  render() {
    const styles = require('./Aside.scss');
    const classes = {};
    const coverImage = {backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%,rgba(26,26,26,1) 100%,rgba(0,0,0,0.5) 100%), url(' + this.props.user.cover + ')'};

    classes[styles.navOpen] = this.props.visible;

    return (
      <nav className={classnames(styles.nav, classes)} ref="aside">
				<div className={styles.header} style={coverImage}>
					<Avatar className={styles.avatar} size={100} user={this.props.user} />
					<ul className={styles.stats}>
						<li className={styles.item}>{this.props.user.followed_count} <i>Seguidores</i></li>
						<li className={styles.item}>{this.props.user.following_count} <i>Siguiendo</i></li>
						<li className={styles.item}>{this.props.user.known} <i>Conocidos</i></li>
					</ul>
				</div>
				<ul className={styles.list}>
					<li>
						<Link className={classnames(styles.link, styles.home)} to="/">
							<Icon name="home" />
							<span className={styles.label}>Inicio</span>
						</Link>

						<Link className={classnames(styles.link, styles.forums)} to="/forums">
							<Icon name="forums" />
							<span className={styles.label}>Foros</span>
						</Link>

						<Link className={classnames(styles.link, styles.events)} to="/events">
							<Icon name="events" />
							<span className={styles.label}>Eventos</span>
						</Link>
					</li>
				</ul>

			</nav>
    );
  }
}
