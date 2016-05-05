import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

@connect(
  state => ({
    user: state.auth.user,
    loggingIn: state.auth.loggingIn
  }),
  authActions)

class Landing extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loggingIn: PropTypes.bool.isRequired,
    intl: intlShape.isRequired
  }

  login = () => {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    this.props.login(username, password);
  }

  render() {
    const styles = require('./Landing.scss');
    const { intl } = this.props;

    return (
      <div className="container LANDING">
        <div className={styles.login_form}>
          <input ref="username" type="text" placeholder={intl.formatMessage({ id: 'app.Landing.username' })} required autoFocus />
          <input ref="password" type="password" placeholder={intl.formatMessage({ id: 'app.Landing.password' })} required />
        	<button type="submit" onClick={this.login} disabled={this.props.loggingIn}>{ this.props.loggingIn ? <FormattedMessage id="app.Landing.logginIn" /> : <FormattedMessage id="app.Landing.login" /> }</button>
        </div>
      </div>
    );
  }
}

export default injectIntl(Landing);
