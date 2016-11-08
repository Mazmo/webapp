import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([
  {
    deferred: false,
    key: 'profile',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}`)
  }
])

export default class Albums extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  render() {
    const styles = require('./Albums.scss');
    const user = this.props.profile;
    const albums = user.albums.filter(album => album.cover);

    return (
      <div className={styles.albums}>
        {albums.map(album => (
          <a className={styles.album} href="#" key={album.id}>
            {album.cover && <img className={styles.cover} src={album.cover.src.replace('::dimension::', '200x')} />}
            <h3 className={styles.title}>{album.title}</h3>
          </a>
        ))}
      </div>
    );
  }
}
