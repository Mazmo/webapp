import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Avatar } from '../../';

export default class Rsvp extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const styles = require('./Rsvp.scss');
    const publication = this.props.data;

    return (
      <div className={classnames(styles.feedRsvp, styles.rsvp)}>
        <div className={styles.rsvpHeader}>
          <h3 className={styles.rsvpTitle}>{publication.rsvp.event.title}</h3>
          <p className={styles.rsvpDate}>{/* moment(this.props.data.created_at.date).format("dddd D MMMM YYYY") */}</p>
          <Avatar className={styles.rsvpAvatar} size={100} user={publication.rsvp.user} />
        </div>
        <div className={styles.rsvpBottom}>
          <h4 className={styles.rsvpGoing}>{publication.author.displayname} Asistirá</h4>
          <div className={styles.rsvpDescription} dangerouslySetInnerHTML={{__html: (publication.rsvp.event.description)}}></div>
        </div>
      </div>
    );
  }
}
