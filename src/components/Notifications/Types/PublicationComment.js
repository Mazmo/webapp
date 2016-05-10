import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import { Avatar } from '../../';

class PublicationComment extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    user: PropTypes.object
  };

  render() {
    const styles = require('../Notification.scss');
    const date = new Date(this.props.data.updated_at.date);
    let label = <span>comentó tu estado</span>;
    if (this.props.data.publication_comment.publication.user.id !== this.props.user.id) {
      label = <span>comentó el estado de <strong>{this.props.data.publication_comment.publication.user.displayname}</strong></span>;
    }
    return (
      <div className={styles.notification}>
        <Avatar className={styles.image} size={100} user={this.props.data.interact_user} />
        <p className={styles.text}>
          <strong className={styles.nick}>{this.props.data.interact_user.displayname}</strong> {label}<br />
          <span className={styles.notificationDescription}>{this.props.data.publication_comment.comment}</span>
          <time className={styles.time}><FormattedRelative value={date} /></time>
        </p>
      </div>
    );
  }
}

export default injectIntl(PublicationComment);
