import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import es from 'react-intl/locale-data/es';
import { addLocaleData, IntlProvider } from 'react-intl';
import locales from '../../utils/locales';
import {
  Navbar,
  Aside
} from '../../components';

const locale = 'es';
addLocaleData([...es]);
const messages = locales(locale);

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    const { user } = this.props;
    const styles = require('./App.scss');

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          {user && <Navbar user={user} />}
          {user && <Aside user={user} />}

          <div className={styles.appContent}>
            {this.props.children}
          </div>

          {user &&
            <button onClick={this.props.logout}>Logout</button>
          }
        </div>
      </IntlProvider>
    );
  }
}
