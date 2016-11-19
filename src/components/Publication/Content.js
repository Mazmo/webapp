import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedRelative } from 'react-intl';
import { Rsvp, LinkImage, Pictures, Video } from './';
import ModalReactions from './Modals/Reactions';
import { Avatar, Icon, ContextMenu } from 'components';

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
      <div className={styles.publication}>
        <div className={styles.header}>
          <Avatar className={styles.avatar} size={60} user={publication.author} />
          <div className={styles.prompt}>
            <Link className={styles.link} to={`/${publication.author.username}`}>{publication.author.displayname}</Link>
            <Link className={styles.date} to={`/publications/${publication.id}`}><FormattedRelative value={publication.created_at.date} /></Link>
          </div>
          <div className={styles.options} ref="contexttrigger">
            <Icon className={styles.optionsIcon} name="dots-vertical" onClick={this.toggleContext} />
            <ContextMenu visible={this.state.showContext}>
              <span onClick={this.openModalReactions}>Ver spanks</span>
              <a>Editar</a>
              <a className="important">Borrar</a>
            </ContextMenu>
          </div>
        </div>
        <div className={styles.content}>
          {publication.rsvp && <Rsvp data={publication} />}
          {this.props.data.link_image && !this.props.data.video && <LinkImage data={publication} />}
          {this.props.data.picture_count > 0 && <Pictures data={publication} />}
          {this.props.data.video && <Video data={publication} />}
          <p className={styles.text} dangerouslySetInnerHTML={{__html: (publication.message + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2')}}></p>
          {publication.publication_share &&
            <div className={styles.shared}><Content data={publication.publication_share} /></div>
          }
        </div>

        {this.state.modals.reactions &&
          <ModalReactions
            close={this.closeModalReactions}
            data={this.props.data.reactions}
          />
        }
      </div>
    );
  }
}
