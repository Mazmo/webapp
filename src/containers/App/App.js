import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import es from 'react-intl/locale-data/es';
import { addLocaleData, IntlProvider } from 'react-intl';
import locales from 'utils/locales';
import io from 'utils/socket';
import {
  Header,
  Aside,
  FullDropdown,
  Messages,
  Notifications,
  Loading
} from 'components';

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
    chats: state.messages.chats
  }),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    chats: PropTypes.object.isRequired,
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
      },
      handshaked: false
    };
  }

  componentDidMount = () => {
    if (__CLIENT__ && this.props.user) {
      this.handshake();

      io.on('reconnect', () => {
        this.handshake();
      });

      io.on('users:connect', (data) => {
        console.log('👤➡️ user connected', data);
      });
      io.on('users:disconnect', (data) => {
        console.log('⬅️👤 user left', data);
      });
    }
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

  handshake = () => {
    // Get unique following users ids
    let ids = [];
    Object.keys(this.props.user.follow_lists).map((listId) => {
      const list = this.props.user.follow_lists[listId];
      ids = ids.concat(Object.keys(list.users));
    });
    //

    const data = {
      jwt: this.props.user.jwt,
      followingUsers: Array.from(new Set(ids))
    };
    io.emit('handshake:send', data, (err) => {
      if (err) {
        //
      } else {
        this.setState({ handshaked: true });
      }
    });
  }

  toggleAside = () => { this.setState({ aside: !this.state.aside }); }
  toggleNotifications = () => { this.setState({ dropdowns: { notifications: !this.state.dropdowns.notifications, messages: false } }); };
  toggleMessages = () => { this.setState({ dropdowns: { notifications: false, messages: !this.state.dropdowns.messages } }); };

  render() {
    const { user } = this.props;
    const { dropdowns } = this.state;
    const styles = require('./App.scss');

    if (user && !this.state.handshaked) {
      return (
        <div>
          <Loading
            theme={'dark'}
            size={'large'}
            position={'absolute'}
          />
        </div>
      );
    }

    const chats = this.props.chats;
    let unreadMessages = 0;
    if (user) {
      Object.keys(chats).map((key) => {
        const index = chats[key].participants.indexOf(user.id);
        if (index > -1) {
          if (chats[key].users[user.id].unread) {
            unreadMessages++;
          }
        }
      });
    }

    const dropdownActive = dropdowns.notifications || dropdowns.messages;
    let headerLabel;
    if (dropdowns.notifications) headerLabel = 'Notifications';
    if (dropdowns.messages) headerLabel = 'Messages';

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={styles.app}>
          <Helmet {...config.app.head}/>

          {user &&
            <Header
              logo={!dropdownActive}
              label={headerLabel}
              buttons={[
                {icon: 'nav', side: 'left', action: this.toggleAside},
                {icon: 'bell', side: 'right', active: dropdowns.notifications, action: this.toggleNotifications, counter: this.props.user.alerts_unread},
                {icon: 'message', side: 'right', active: dropdowns.messages, action: this.toggleMessages}
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
                <Messages
                  user={this.props.user}
                  toggle={this.toggleMessages}
                />
              </FullDropdown>
            </div>
          }

          {this.props.children}

        </div>
      </IntlProvider>
    );
  }
}
