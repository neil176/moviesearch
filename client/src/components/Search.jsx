import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    query: '',
  };

  static style = {
    marginBottom: '5%',
    textAlign: 'center',
  }
  static inputStyle = {
    backgroundColor: 'lightgrey',
    width: '60%',
    height: '24px',
    borderRadius: '3px',
    paddingLeft: '6px',
  }

  componentDidMount() {
    if (this.input) this.input.focus();
  }

  getInputRef = el => {
    this.input = el;
  };

  clearAndSearch = () => {
    const { query: currentQuery } = this.state;
    const { onSearch, history } = this.props;
    onSearch(currentQuery);
    this.input.value = '';
    this.setState({
      query: '',
    });
    history.push('/');
  }

  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
  }

  handleKeyDown = event => {
    if (event.keyCode === 13) return this.clearAndSearch();
  };

  handleSubmit = () => this.clearAndSearch();

  render() {

    return (
      <div style={ Search.style }>
        <input
          ref={ this.getInputRef } 
          style={ Search.inputStyle }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
        />
        <p>Search here for your favorite movie!</p>
      </div>
    );
  }
}
