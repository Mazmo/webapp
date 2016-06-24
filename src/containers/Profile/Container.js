import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Avatar, Icon } from '../../components';

@asyncConnect([
  {
    deferred: false,
    key: 'profile',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}`)
  }
])
export default class Container extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Container.scss');
    const { profile } = this.props;

    return (
      <div className={styles.container}>
        <Helmet title={profile.displayname} />
        <div>
          <Avatar size={100} user={profile} />
          <h1>{profile.displayname}</h1>
          <p>{profile.location}</p>
          <button>Seguir</button>
        </div>

        <div>
          <div>{profile.followed_count} seguidores</div>
          <div>{profile.known} conocidos</div>
          <div>{profile.event_count} eventos</div>
        </div>

        <ul>
          <li><Link to={`/${profile.username}`}><Icon name="userinfo" /></Link></li>
          <li><Link to={`/${profile.username}/wall`}><Icon name="feed" /></Link></li>
          <li><Link to={`/${profile.username}/pictures`}><Icon name="photos" /></Link></li>
          <li><Link to={`/${profile.username}/checklist`}><Icon name="checklist" /></Link></li>
        </ul>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
