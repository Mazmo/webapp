import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Publication } from '../../components';
import {
  createComment,
  reactToPublication,
  reactToComment,
  loadReactions
} from 'redux/modules/publications';

@asyncConnect([
  {
    deferred: false,
    key: 'data',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}/publications`)
  }
])
@connect(
  state => ({
    me: state.auth.user,
    canCreateComment: !state.publications.creatingComment,
    publications: state.publications.data
  }), { createComment, reactToPublication, reactToComment, loadReactions}
)
export default class Publications extends Component {
  static propTypes = {
    me: PropTypes.object,
    publications: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    createComment: PropTypes.func.isRequired,
    canCreateComment: PropTypes.bool.isRequired,
    reactToPublication: PropTypes.func.isRequired,
    reactToComment: PropTypes.func.isRequired,
    loadReactions: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Publications.scss');
    return (
      <div className={styles.publications}>
        {this.props.data.map((publication, i) => {
          return (
            <Publication
              key={i}
              me={this.props.me}
              data={publication}
              react={this.props.reactToPublication}
              createComment={this.props.createComment}
              canCreateComment={this.props.canCreateComment}
              reactToComment={this.props.reactToComment}
              loadReactions={this.props.loadReactions}
            />
          );
        })}
      </div>
    );
  }
}
