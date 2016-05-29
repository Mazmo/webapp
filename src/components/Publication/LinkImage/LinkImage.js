import React, { Component, PropTypes } from 'react';

export default class LinkImage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const styles = require('./LinkImage.scss');
    const publication = this.props.data;

    return (
      <img className={styles.photo} src={publication.link_image} />
    );
  }
}
