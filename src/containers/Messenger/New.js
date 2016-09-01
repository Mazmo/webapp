import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';
import Autosuggest from 'react-autosuggest';
import { routeActions } from 'react-router-redux';
import { loadByUsername } from 'redux/modules/messages';

@connect(null, { pushState: routeActions.push, loadByUsername })
export default class New extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    loadByUsername: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsUpdateRequested = ({ value }) => {
    this.setState({ loading: true });
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      this.setState({
        loading: false,
        suggestions: []
      });
    } else {
      superagent.get('https://mazmorra.net/api/users/search/' + inputValue).then((result) => {
        this.setState({
          loading: false,
          suggestions: result.body
        });
      });
    }
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.username;
  }

  select = (event, { suggestionValue }) => {
    this.props.loadByUsername(suggestionValue, (err, hash) => {
      if (!err) {
        this.props.pushState(`/messenger/${hash}`);
      } else {
        console.error(err);
      }
    });
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.displayname}</span>
    );
  }

  render() {
    const styles = require('./New.scss');
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Buscar usuarix',
      value,
      onChange: this.onChange,
      className: styles.search
    };

    return (
      <div className={styles.container}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
          inputProps={inputProps}
          shouldRenderSuggestions={(val) => val.trim().length > 2}
          alwaysRenderSuggestions
          onSuggestionSelected={this.select}
        />
        {this.state.loading && <span>Cargando...</span>}
      </div>
    );
  }
}
