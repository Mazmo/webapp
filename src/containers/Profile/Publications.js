import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Publication } from '../../components';

@asyncConnect([
  {
    deferred: false,
    key: 'data',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}/publications`)
  }
])
@connect(
  state => ({
    me: state.auth.user
  })
)
export default class Publications extends Component {
  static propTypes = {
    me: PropTypes.object,
    profile: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  };

  render() {
    const styles = require('./Publications.scss');
    return (
      <div className={styles.container}>
        {this.props.data.map((publication, i) => {
          return (
            <Publication
              key={i}
              me={this.props.me}
              data={publication}
            />
          );
        })}
      </div>
    );
  }
}
