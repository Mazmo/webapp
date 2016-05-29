import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

export default class CommentsList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    const styles = require('./CommentsList.scss');
    return (
      <div>
        {/* LoadMore */}
        <ul className={styles.comments}>
          {this.props.data.map((comment, i) => {
            return <Comment key={i} data={comment} />;
          })}
        </ul>
      </div>
    );
  }
}
