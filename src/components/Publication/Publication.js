import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import { Avatar, Icon, ContextMenu } from '../';
import { Rsvp, LinkImage, Pictures, Video } from './';

class Publication extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showContext: false
    };
  }

  toggleContext = () => {
    this.setState({
      showContext: !this.state.showContext
    });
  }

  render() {
    const styles = require('./Publication.scss');
    const publication = this.props.data;

    return (
      <div className={styles.feedItem}>
        <div className={styles.feedItemHeader}>
          <Avatar className={styles.feedItemAvatar} size={60} user={publication.author} />
          <span className={styles.feedItemPrompt}>
            <Link className={styles.feedItemPromptLink} to={`/${this.props.data.author.username}`}>{this.props.data.author.displayname}</Link>
            {publication.picture_count > 0 &&
              <span className={styles.feedItemPromptExtra}> agregó una foto a su álbum <a className={classnames(styles.feedItemPromptLink, styles.album)} href="#">{this.props.data.pictures[0].album.title}</a></span>
            }
            <Link className={styles.feedItemPromptDate} to={`/${this.props.data.id}`}><FormattedRelative value={publication.created_at.date} /></Link>
          </span>
          <div className={styles.feedItemOptions}>
            <Icon
              className={styles.feedItemOptionsIcon}
              name="dots-vertical"
              onClick={this.toggleContext}
            />
            <ContextMenu visible={this.state.showContext}>
              <a className={styles.contextMenuItem}>Ver spanks</a>
              <a className={styles.contextMenuItem}>Editar</a>
              <a className={classnames(styles.contextMenuItem, styles.important)}>Borrar</a>
            </ContextMenu>
          </div>
        </div>
        <div className={styles.feedItemContent}>
          {publication.rsvp && <Rsvp data={publication} />}
          {this.props.data.link_image && !this.props.data.video && <LinkImage data={publication} />}
          {this.props.data.picture_count > 0 && <Pictures data={publication} />}
          {this.props.data.video && <Video data={publication} />}
          <p className={styles.feedItemContentText} dangerouslySetInnerHTML={{__html: (publication.message + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2')}}></p>
          {publication.publication_share &&
            <div className={styles.feedItemContentShared}>
              <div className={styles.feedItemContentSharedPublication}><Publication data={publication.publication_share} /></div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(Publication);
