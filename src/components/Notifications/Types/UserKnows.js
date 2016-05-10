import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import { Avatar } from '../../';

class UserKnows extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  render() {
    const styles = require('../Notification.scss');
    const date = new Date(this.props.data.updated_at.date);
    return (
      <div className={styles.notification}>
        <Avatar className={styles.image} size={100} user={this.props.data.interact_user} />
        <p className={styles.text}>
          <strong className={styles.nick}>{this.props.data.interact_user.displayname}</strong> ha indicado que te conoce personalmente
          <time className={styles.time}><FormattedRelative value={date} /></time>
        </p>
      </div>
    );
  }
}

export default injectIntl(UserKnows);
