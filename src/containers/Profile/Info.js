import React, { Component, PropTypes } from 'react';
import { Icon } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([
  {
    deferred: false,
    key: 'profile',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}`)
  }
])

export default class Info extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  render() {
    const styles = require('./Info.scss');
    const user = this.props.profile;

    return (
      <div className={styles.info}>

        <div className={styles.group}>
          <h3 className={styles.title}>{`Sobre ${user.displayname}`}</h3>
          <p className={styles.bio}>{user.about_me}</p>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="birthday" />
            <span className={styles.rowLabel}>{`${user.age} años`}</span>
          </div>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="person" />
            <span className={styles.rowLabel}>{user.orientation.text}</span>
          </div>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="male" />
            <span className={styles.rowLabel}>{user.sex.text}</span>
          </div>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="heart" />
            <span className={styles.rowLabel}>{user.role.text}</span>
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.title}>Estadísticas</h3>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="topic" />
            <span className={styles.rowLabel}>{`${user.thread_count} Temas`}</span>
          </div>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="post" />
            <span className={styles.rowLabel}>{`${user.post_count} Posts`}</span>
          </div>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="photos" />
            <span className={styles.rowLabel}>{`${user.pictures_count} Fotos`}</span>
          </div>
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="spank" />
            <span className={styles.rowLabel}>{`${user.spank_count || 0} Spanks`}</span>
          </div>
        </div>

      </div>
    );
  }
}
