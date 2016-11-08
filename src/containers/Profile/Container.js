import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Avatar, Icon, Navbar } from '../../components';
import classNames from 'classnames';

@asyncConnect([
  {
    deferred: false,
    key: 'profile',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}`, { params: { relationships: true }})
  }
])
@connect(null, {goBack: routeActions.goBack}
)
export default class Container extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  static avoidMainNavbar = true;

  render() {
    const styles = require('./Container.scss');
    const user = this.props.profile;
    const profileUrl = `/${user.username}`;
    const coverStyle = user.cover ? {
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(26,26,26,1) 100%,rgba(0,0,0,0.65) 100%), url(' + user.cover + ')'
    } : null;

    return (
      <div className={styles.sectionProfile}>
        <Helmet title={user.displayname} />

        <div className={styles.profileHeader} style={coverStyle}>
          <Navbar
            background={'transparent'}
            mainButton={{icon: 'back', action: this.props.goBack}}
          />

          <div>
            <Avatar className={styles.profileHeaderAvatar} size={100} user={user} />
            <h1 className={styles.profileHeaderName}>{user.displayname}</h1>
            <p className={styles.profileHeaderLocation}>{user.location}</p>
            <button className={classNames(styles.profileHeaderFollow, 'btn', 'style-blue')}>Seguir</button>

            <div className={styles.profileHeaderCounters}>
              <div className={styles.profileHeaderCountersItem} data-label="Seguidores">{user.followed_count}</div>
              <div className={styles.profileHeaderCountersItem} data-label="Conocidos">{user.known}</div>
              <div className={styles.profileHeaderCountersItem} data-label="Eventos">{user.event_count}</div>
            </div>

            <ul className={styles.profileHeaderTabs}>
              <div className={styles.profileHeaderTabsItem} name="info">
                <Link className={styles.profileHeaderTabsItemLink} to={profileUrl} params={{ username: user.username }}><Icon name="userinfo" /></Link>
              </div>
              <div className={styles.profileHeaderTabsItem} name="publications">
                <Link className={styles.profileHeaderTabsItemLink} to={profileUrl + '/wall'} params={{ username: user.username }}><Icon name="feed" /></Link>
              </div>
              <div className={styles.profileHeaderTabsItem} name="pictures">
                <Link className={styles.profileHeaderTabsItemLink} to={profileUrl + '/albums'} params={{ username: user.username }}><Icon name="photos" /></Link>
              </div>
              <div className={styles.profileHeaderTabsItem} name="checklist">
                <Link className={styles.profileHeaderTabsItemLink} to={profileUrl + '/checklist'} params={{ username: user.username }}><Icon name="checklist" /></Link>
              </div>
            </ul>
          </div>
        </div>

        <div className="profile-content">
          {React.cloneElement(this.props.children, { profile: this.props.profile })}
        </div>

      </div>
    );
  }
}
