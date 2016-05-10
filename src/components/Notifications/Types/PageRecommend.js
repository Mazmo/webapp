import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';

class PageRecommend extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  render() {
    const styles = require('../Notification.scss');
    const date = new Date(this.props.data.updated_at.date);
    return (
      <div className={styles.notification}>
        <img className={styles.image} src={this.props.data.page.avatar} alt={this.props.data.page.name} />
        <p className={styles.text}>
          <strong className={styles.nick}>{this.props.data.interact_user.displayname}</strong> te recomienda que sigas la página <strong>{this.props.data.page.name}</strong>
          <time className={styles.time}><FormattedRelative value={date} /></time>
        </p>
      </div>
    );
  }
}

export default injectIntl(PageRecommend);
