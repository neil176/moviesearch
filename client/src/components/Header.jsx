import React, { Component } from 'react';

export default class Header extends Component {
  static style = {
    textAlign: 'center',
    width: '100%',
    color: '#f1cf12',
  };

  render() {
    return (
      <div style={ Header.style }>
        <h1>Moviesearch</h1>
      </div>
    )
  }
}
