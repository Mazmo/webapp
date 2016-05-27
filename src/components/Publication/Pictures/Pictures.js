import React, { Component, PropTypes } from 'react';

export default class Pictures extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const styles = require('./Pictures.scss');
    const publication = this.props.data;

    return (
      <ul className={styles.container}>
        {publication.pictures.map((image, i) => {
          return (
            <li key={i}>
              <img className={styles.photo} src={image.src.replace('::dimension::', '590x')} />
            </li>
          );
        })}
      </ul>
    );
  }
}
