import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
  Aside,
  FullDropdown,
  Messages,
  Notifications
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
    user: state.auth.user
  }),
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

  constructor(props) {
    super(props);
    this.state = {
      aside: false,
      dropdowns: {
        notifications: false,
        messages: false
      }
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
  }

  toggleAside = () => { this.setState({ aside: !this.state.aside }); }
  toggleNotifications = () => { this.setState({ dropdowns: { notifications: !this.state.dropdowns.notifications, messages: false } }); };
  toggleMessages = () => { this.setState({ dropdowns: { notifications: false, messages: !this.state.dropdowns.messages } }); };

  render() {
    const { user } = this.props;
    const styles = require('./App.scss');

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          {user && !this.props.children.type.avoidMainNavbar &&
            <Navbar
              icon={'nav'}
              action={this.toggleAside}
              buttons={[
                {icon: 'message', active: this.state.dropdowns.messages, action: this.toggleMessages},
                {icon: 'bell', active: this.state.dropdowns.notifications, action: this.toggleNotifications}
              ]}
            />
          }
          {user &&
            <div>
              <Aside
                user={user}
                visible={this.state.aside}
                toggle={this.toggleAside}
                logout={this.props.logout}
              />
              <FullDropdown
                active={this.state.dropdowns.notifications}
              >
                <Notifications user={this.props.user} />
              </FullDropdown>
              <FullDropdown
                active={this.state.dropdowns.messages}
              >
                <Messages user={this.props.user} />
              </FullDropdown>
            </div>
          }

          <div className={classnames({[styles.content]: !this.props.children.type.avoidMainNavbar})}>
            {this.props.children}
          </div>
        </div>
      </IntlProvider>
    );
  }
}
