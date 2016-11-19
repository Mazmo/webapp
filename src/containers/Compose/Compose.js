import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import { create } from 'redux/modules/publications';
import { Header } from '../../components';

@connect(
  state => ({
    creating: state.publications.creating,
    creatingError: state.publications.creatingError
  }), { create, goBack: routeActions.goBack}
)
export default class Compose extends Component {
  static propTypes = {
    creating: PropTypes.bool.isRequired,
    creatingError: PropTypes.string,
    create: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  back = () => {
    // this.props.pushState('/');
    this.props.goBack();
  }

  publish = () => {
    const message = this.refs.message.value;

    this.props.create({
      message,
      privacy: 0
    });
  }

  render() {
    const styles = require('./Compose.scss');
    return (
      <div className={styles.container}>
        <Helmet title="Crear nueva publicación" />

        <Header context={{
          label: 'Publicar',
          buttons: [
            {icon: 'back', side: 'left', action: this.back},
            {icon: 'image-add', side: 'right', action: null}
          ]
        }} />

        <div className="content">
          <textarea
            className={styles.input}
            ref="message"
            placeholder="¿Qué está pasando por tu sucia mente?"
            disabled={this.props.creating}
          ></textarea>
          <div className={styles.link}>
            <img className={styles.linkImage} src="https://placekitten.com/200/200" alt=""/>
            <h3 className={styles.linkTitle}>The tiniest and cutest kittens in the whole world</h3>
          </div>
          <div className={styles.images}>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/200" alt=""/>
            <img className={styles.image} src="https://placekitten.com/200/500" alt=""/>
            <img className={styles.image} src="https://placekitten.com/500/200" alt=""/>
          </div>
          <div className={styles.video}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/y6120QOlsfU" frameBorder="0" allowFullscreen></iframe>
          </div>
          <div className={styles.actionBar}>
            <select className={styles.albumSelect}>
              <option value={1}>My album</option>
            </select>
            <button className={styles.publishButton}>Publicar</button>
          </div>
        </div>
      </div>
    );
  }
}
