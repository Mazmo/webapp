import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';

export default class CommentsList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    me: PropTypes.object
  };

  constructor(props) {
    super(props);
    let notShowing = this.props.data.length;
    if (typeof this.props.me !== 'undefined' && this.props.data.length > 0 && this.props.data[this.props.data.length - 1].user.id === this.props.me.id) {
      notShowing--;
    }
    this.state = {
      notShowing
    };
  }

  showAll = () => {
    this.setState({ notShowing: 0 });
  }

  render() {
    const styles = require('./CommentsList.scss');
    const comments = this.props.data;

    return (
      <div>
        {this.state.notShowing > 0 &&
          <LoadMoreComments
            count={this.state.notShowing}
            showAll={this.showAll}
          />
        }
        <ul className={styles.comments}>
          {comments.slice(this.state.notShowing, comments.length).map((comment, i) => {
            return <Comment key={i} data={comment} />;
          })}
        </ul>
      </div>
    );
  }
}
