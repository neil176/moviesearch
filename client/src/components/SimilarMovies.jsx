import React, { Component } from 'react';

export default class SimilarMovies extends Component {
  static style = {
    display: 'flex',

  }
  render() {
    return (
      <div style={ SimilarMovies.style }>
        {
          movies.map(movie => <SimilarMovie />)
        }
      </div>
    );
  }
}