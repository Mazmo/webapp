import React, { Component, PropTypes } from 'react';
import { Icon } from '../../';

export default class Video extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  playVideo = () => {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
  }

  render() {
    const styles = require('./Video.scss');

    if (this.state.loaded) {
      const videoEmbed = 'https://www.youtube.com/embed/' + this.props.data.video_id + '?autoplay=1';
      return (
        <div className={styles.videoEmbedWrapper}>
          <iframe className={styles.videoEmbed} src={videoEmbed} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    }
    return (
      <div className={styles.videoContainer} onClick={this.playVideo}>
        <h3 className={styles.videoTitle}>{this.props.data.link_title}</h3>
        <Icon context={styles.videoPlay} name="play" />
        <img className={styles.videoImage} src={this.props.data.link_image} />
      </div>
    );
  }
}
