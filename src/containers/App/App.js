import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { chgIcon as chgNavIcon, chgTitle as chgNavTitle, chgAction as chgNavAction } from 'redux/modules/nav';
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
  state => ({
    user: state.auth.user,
    nav: state.nav
  }),
  {logout, chgNavIcon, chgNavTitle, chgNavAction, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    nav: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    chgNavIcon: PropTypes.func.isRequired,
    chgNavTitle: PropTypes.func.isRequired,
    chgNavAction: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      aside: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }

    if (!this.props.nav.action && nextProps.nav.action && this.state.aside) {
      // Hide aside if another nav icon is triggered
      this.setState({ aside: false });
    }
  }

  toggleAside = () => {
    this.setState({ aside: !this.state.aside });
  }

  render() {
    const { user } = this.props;
    const styles = require('./App.scss');
    const navAction = this.props.nav.action ? this.props.nav.action : this.toggleAside;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          {user &&
            <Navbar
              user={user}
              icon={this.props.nav.icon}
              title={this.props.nav.title}
              logo={this.props.nav.logo}
              action={navAction}
              chgTitle={this.props.chgNavTitle}
              chgIcon={this.props.chgNavIcon}
              chgAction={this.props.chgNavAction} />
          }
          {user &&
            <Aside
              user={user}
              visible={this.state.aside}
              toggle={this.toggleAside} />
          }

          <div className={styles.content}>
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
