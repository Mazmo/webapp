import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import { create } from 'redux/modules/publications';
import { Navbar } from '../../components';

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

  static avoidMainNavbar = true;

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

        <Navbar
          background={'transparent'}
          title={'Publicar'}
          mainButton={{icon: 'back', action: this.back}}
        />

        <div className="content">
          {this.props.creatingError &&
            <div>ERROR: {this.props.creatingError}</div>
          }

          <textarea
            ref="message"
            placeholder="¿Qué está pasando por tu sucia mente?"
            disabled={this.props.creating}
            ></textarea>
          <button onClick={this.publish} disabled={this.props.creating}>{this.props.creating ? 'Publicando...' : 'Publicar'}</button>
        </div>
      </div>
    );
  }
}
