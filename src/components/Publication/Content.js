import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { FormattedRelative } from 'react-intl';
import { Avatar, Icon, ContextMenu } from '../';
import { Rsvp, LinkImage, Pictures, Video } from './';
import ModalReactions from './Modals/Reactions';

export default class Content extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    loadReactions: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showContext: false,
      modals: {
        reactions: false
      }
    };
  }

  clickedOutside = (event) => {
    const trigger = this.refs.contexttrigger;
    const isOutside = !trigger.contains(event.target) || event.target.nodeName === 'A' || event.target.nodeName === 'SPAN';

    if (isOutside && this.state.showContext) {
      this.toggleContext();
    }
  }

  toggleContext = () => {
    const showContext = !this.state.showContext;
    this.setState({ showContext });

    if (showContext) {
      document.addEventListener('click', this.clickedOutside);
    } else {
      document.removeEventListener('click', this.clickedOutside);
    }
  }

  closeModalReactions = () => this.setState({ modals: { reactions: false }});
  openModalReactions = () => {
    const publication = this.props.data;
    if (this.props.loadReactions && (!publication.reactions || (!publication.reactions.data && !publication.reactions.loading))) {
      this.props.loadReactions(publication.id);
    }
    this.setState({ modals: { reactions: true }});
  }

  render() {
    const styles = require('./Content.scss');
    const publication = this.props.data;

    return (
      <div>
        <div className={styles.feedItemHeader}>
          <Avatar className={styles.feedItemAvatar} size={60} user={publication.author} />
          <span className={styles.feedItemPrompt}>
            <Link className={styles.feedItemPromptLink} to={`/${this.props.data.author.username}`}>{this.props.data.author.displayname}</Link>
            {publication.picture_count > 0 && publication.pictures.length > 0 &&
              <span className={styles.feedItemPromptExtra}> agregó una foto a su álbum <a className={cn(styles.feedItemPromptLink)} href="#">{publication.pictures[0].album.title}</a></span>
            }
            <Link className={styles.feedItemPromptDate} to={`/${this.props.data.id}`}><FormattedRelative value={publication.created_at.date} /></Link>
          </span>
          <div className={styles.feedItemOptions} ref="contexttrigger">
            <Icon
              className={styles.feedItemOptionsIcon}
              name="dots-vertical"
              onClick={this.toggleContext}
            />
            <ContextMenu visible={this.state.showContext}>
              <span onClick={this.openModalReactions}>Ver spanks</span>
              <a>Editar</a>
              <a className="important">Borrar</a>
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
              <div className={styles.feedItemContentSharedPublication}><Content data={publication.publication_share} /></div>
            </div>
          }
        </div>

        <div>
          {this.state.modals.reactions &&
            <ModalReactions
              close={this.closeModalReactions}
              data={this.props.data.reactions}
            />
          }
        </div>
      </div>
    );
  }
}
