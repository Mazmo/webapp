import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Publication, Loading, Icon } from '../../components';
import {
  isLoaded as arePublicationsLoaded,
  load as loadPublications,
  createComment,
  reactToPublication,
  reactToComment,
  loadReactions
} from 'redux/modules/publications';

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
    publications: state.publications.data,
    canCreateComment: !state.publications.creatingComment
  }), { createComment, reactToPublication, reactToComment, loadReactions, loadPublications }
)
export default class Home extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    loadingPublications: PropTypes.bool.isRequired,
    publications: PropTypes.array.isRequired,
    createComment: PropTypes.func.isRequired,
    canCreateComment: PropTypes.bool.isRequired,
    reactToPublication: PropTypes.func.isRequired,
    reactToComment: PropTypes.func.isRequired,
    loadReactions: PropTypes.func.isRequired,
    loadPublications: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const gap = 200;
    const body = e.target.body;
    if (!this.props.loadingPublications && body.scrollTop + body.offsetHeight > body.scrollHeight - gap) {
      this.props.loadPublications();
    }
  }

  render() {
    const styles = require('./Home.scss');
    const { publications, loadingPublications } = this.props;

    return (
      <div>
        <Helmet title="Home"/>

        <div className={styles.container}>
          <div className={styles.feed}>
            {publications.map((publication, i) => {
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
        </div>

        {loadingPublications &&
          <Loading
            theme={'light'}
            size={'medium'}
            position={publications.length > 0 ? 'relative' : 'absolute'}
          />
        }

        <div className={styles.floatingButtons}>
          <Link className={styles.button} to={'/compose'}>
            <Icon name="pencil" />
          </Link>
        </div>

      </div>
    );
  }
}
