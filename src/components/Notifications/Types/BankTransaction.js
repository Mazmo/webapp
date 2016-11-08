import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import { Avatar } from '../../';

class BankTransaction extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  render() {
    const styles = require('../Notification.scss');
    const date = new Date(this.props.data.updated_at.date);
    const from = this.props.data.transaction.from ? this.props.data.transaction.from.displayname : 'Bank of Mazmorra';
    const type = this.props.data.transaction.type === 0 ? 'cobrado' : 'depositado';
    return (
      <div className={styles.notification}>
        {this.props.data.transaction.from && <Avatar className={styles.image} size={100} user={this.props.data.transaction.from} />}
        <p className={styles.text}>
          <strong className={styles.nick}>{from}</strong> te ha {type} la suma de <strong>§{this.props.data.transaction.amount} SADEs</strong>
          <time className={styles.time}><FormattedRelative value={date} /></time>
        </p>
      </div>
    );
  }
}

export default injectIntl(BankTransaction);
