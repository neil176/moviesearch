import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class Header extends Component {
  static style = {
    textAlign: 'center',
    width: '100%',
  };

  render() {
    return (
      <div style={ Header.style }>
        <h1>Moooviesearch</h1>
      </div>
    )
  }
}
