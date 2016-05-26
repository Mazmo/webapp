import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import { Avatar } from '../';
import { Rsvp, LinkImage, Pictures } from './Types/';

class Publication extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };


  render() {
    const styles = require('./Publication.scss');
    const publication = this.props.data;

    return (
      <div className={styles.feedItem}>
        <div className={styles.feedItemHeader}>
          <Avatar className={styles.feedItemAvatar} size={60} user={publication.author} />
          <span className={styles.feedItemPrompt}>
            <Link className={styles.feedItemPromptLink} to={`/${this.props.data.author.username}`}>{this.props.data.author.displayname}</Link>
            <Link className={styles.feedItemPromptDate} to={`/${this.props.data.id}`}><FormattedRelative value={publication.created_at.date} /></Link>
          </span>
        </div>
        <div className={styles.feedItemContent}>
          {publication.rsvp && <Rsvp data={publication} />}
          {this.props.data.link_image && !this.props.data.video && <LinkImage data={publication} />}
          {this.props.data.picture_count > 0 && <Pictures data={publication} />}
          <p className={styles.feedItemContentText} dangerouslySetInnerHTML={{__html: (publication.message + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2')}}></p>
        </div>
      </div>
    );
  }
}

export default injectIntl(Publication);
