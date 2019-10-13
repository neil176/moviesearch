import React, { Component } from 'react';

export default class SimilarMovieListItem extends Component {
  static style = {
    display: 'flex',
  }

  render() {
    return (
      <div style={ SimilarMovieListItem.style }>
        similar movie
        { JSON.stringify(this.props) }
      </div>
    );
  }
}