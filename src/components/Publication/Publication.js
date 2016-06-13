import React, { Component, PropTypes } from 'react';
import Content from './Content';
import ActionButton from './ActionButton';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';

export default class Publication extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    me: PropTypes.object,
    createComment: PropTypes.func.isRequired,
    canCreateComment: PropTypes.bool.isRequired
  };

  createComment = (message) => {
    this.props.createComment(this.props.data.id, message);
  }

  render() {
    const styles = require('./Publication.scss');
    const publication = this.props.data;
    return (
      <div className={styles.item}>
        <Content data={publication} />

        <div className={styles.itemActions}>
          <ActionButton
            icon="comments"
            counter={publication.comment_count}
            active={false}
          />
          <ActionButton
            icon="spank"
            counter={publication.spank_count > 0 ? publication.spank_count : null}
            active={false}
          />
          <ActionButton
            icon="share"
            counter={publication.share_count > 0 ? publication.share_count : null}
            active={false}
          />
        </div>

        <div className="comments">
          <CommentsList
            me={this.props.me}
            data={publication.comments}
          />
          {this.props.me &&
            <CreateComment
              me={this.props.me}
              createComment={this.createComment}
              disabled={!this.props.canCreateComment}
            />
          }
        </div>
      </div>
    );
  }
}
