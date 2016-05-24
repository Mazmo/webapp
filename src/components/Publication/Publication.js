import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Avatar,
  Icon,
  ContextMenu
} from '../';

export default class Publication extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };


  render() {
    const styles = require('./Publication.scss');
    const publication = this.props.data;

    return (
      <div>
        <div className={styles.feedItemHeader}>
          <Avatar className={styles.feedItemAvatar} size={48} user={publication.author} />
          <span className="feed-item-prompt">
            <Link className="feedItemPromptLink user" to={`/${publication.author.username}`}>{publication.author.displayname}</Link>
            {/* <Link className="feed-item-prompt-date" to="publication" params={{id: publication.id}}>{moment(publication.created_at.date).fromNow()}</Link> */}
          </span>
          <div className="feed-item-options">
            <Icon context="feed-item-options-icon" name="dots-vertical" />
            <ContextMenu>
              <a className="context-menu-item">Ver spanks</a>
              <a className="context-menu-item">Editar</a>
              <a className="context-menu-item important">Borrar</a>
            </ContextMenu>
          </div>
        </div>
        <div className="feed-item-content">
        </div>
      </div>
    );
  }
}
