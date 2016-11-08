import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import classNames from 'classnames';

@asyncConnect([
  {
    deferred: false,
    key: 'checklist',
    promise: ({params: { username }, helpers: { client }}) => client.get(`/users/${username}/checklist`).catch((error) => error).then((response) => response)
  }
])

export default class Checklist extends Component {

  static propTypes = {
    checklist: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Checklist.scss');
    const error = this.props.checklist.error;
    const checklist = this.props.checklist.results;

    if (error) {
      return <div className={styles.error}>{error}</div>;
    }

    return checklist ? (
      <div className={styles.checklist}>

        {checklist.map(group => {
          const items = group.items.filter(item => item.selection);

          if (items.length) {
            return (
              <div className={styles.group} key={group.category.id}>
                <div className={styles.header}>
                  <h3 className={styles.headerTitle}>{group.category.name}</h3>
                  <span className={styles.headerExperience}>Experience</span>
                  <span className={styles.headerInterest}>Interest</span>
                </div>
                {items.map(item => {
                  const row = item.selection;
                  const expClasses = classNames(styles.rowExperience, styles[`level${row.experience}`]);
                  const intClasses = classNames(styles.rowInterest, styles[`level${row.interest}`]);

                  return (
                    <div className={styles.row} key={item.id}>
                      <span className={styles.rowLabel}>{item.name}</span>
                      <span className={expClasses}>{row.experience_text}</span>
                      <span className={intClasses}>{row.interest_text}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}

      </div>
    ) : null;
  }
}
