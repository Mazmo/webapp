import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import {
  isLoaded as arePublicationsLoaded,
  load as loadPublications,
  createComment
} from 'redux/modules/publications';
import { Publication } from '../../components';

@asyncConnect([
  {
    deferred: false,
    promise: ({store: {dispatch, getState}}) => {
      if (!arePublicationsLoaded(getState())) {
        return dispatch(loadPublications());
      }
    }
  }
])
@connect(
  state => ({
    me: state.auth.user,
    loadingPublications: state.publications.loading,
    publications: state.publications.data
  }), { createComment }
)
export default class Home extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    loadingPublications: PropTypes.bool.isRequired,
    publications: PropTypes.array.isRequired,
    createComment: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Home.scss');

    return (
      <div>
        <Helmet title="Home"/>

        <div className={styles.feedList}>
          {this.props.publications.map((publication, i) => {
            return (
              <Publication
                key={i}
                me={this.props.me}
                data={publication}
                createComment={this.props.createComment}
              />
            );
          })}
        </div>
        {this.props.loadingPublications && <div>Loading...</div>}
      </div>
    );
  }
}
