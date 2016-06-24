import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import MobileDetect from 'mobile-detect';

export default class CommentsList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    me: PropTypes.object,
    react: PropTypes.func.isRequired,
    showAll: PropTypes.func.isRequired,
    notShowing: PropTypes.number.isRequired
  };

  render() {
    const md = new MobileDetect(global.navigator.userAgent);
    const styles = require('./CommentsList.scss');
    const comments = this.props.data;

    return (
      <div>
        {md.phone() === null && this.props.notShowing > 0 &&
          <LoadMoreComments
            count={this.props.notShowing}
            showAll={this.props.showAll}
          />
        }
        <ul className={styles.comments}>
          {comments.slice(this.props.notShowing, comments.length).map((comment, i) => {
            return (
              <Comment
                key={i}
                data={comment}
                react={this.props.react}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
