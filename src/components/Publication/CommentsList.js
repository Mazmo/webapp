import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';

export default class CommentsList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showing: 0
    };
  }

  showAll = () => {
    this.setState({ showing: this.props.data.length });
  }

  render() {
    const styles = require('./CommentsList.scss');
    const notShowing = this.props.data.length - this.state.showing;

    return (
      <div>
        {notShowing > 0 &&
          <LoadMoreComments
            count={notShowing}
            showAll={this.showAll}
          />
        }
        <ul className={styles.comments}>
          {this.props.data.map((comment, i) => {
            if (i < this.state.showing) {
              return <Comment key={i} data={comment} />;
            }
          })}
        </ul>
      </div>
    );
  }
}
