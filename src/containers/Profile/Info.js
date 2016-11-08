import React, { Component, PropTypes } from 'react';
import { Icon } from 'components';
import classNames from 'classnames';
import { Link } from 'react-router';

export default class Info extends Component {

  static propTypes = {
    profile: PropTypes.object,
    params: PropTypes.object
  };

  render() {
    const styles = require('./Info.scss');
    const user = this.props.profile;

    return (
      <div className={styles.info}>

        <div className={styles.group}>
          <div className={styles.badges}>
            {['red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow'].map((color, i) => (
              <svg className={styles.badge} key={i} viewBox="0 0 24 24">
                <path className={classNames(styles.fill, styles[color])} d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z" />
                <path className={styles.stroke} d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
              </svg>
            ))}
          </div>
          {user.about_me &&
            <div>
              <h3 className={styles.title}>{`Sobre ${user.displayname}`}</h3>
              <p className={styles.bio}>{user.about_me}</p>
            </div>
          }

          {user.relationships && user.relationships.map((relationship, i) => (
            <div className={styles.row} key={i}>
              <Icon className={styles.rowIcon} name="user" />
              <span className={styles.rowLabel}>
                {`${relationship.type.text} de `}
                <Link className={styles.rowLink} to={`/${relationship.related_to.username}`}>
                  {relationship.related_to.displayname}
                </Link>
              </span>
            </div>
          ))}

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
          <div className={styles.row}>
            <Icon className={styles.rowIcon} name="briefcase" />
            <span className={styles.rowLabel}>{user.work}</span>
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
