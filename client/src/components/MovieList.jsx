import React, { Component } from 'react';

import MovieListItem from './MovieListItem';

export default class MovieList extends Component {
  static defaultProps = {
    movies: [],
  };

  static style = {
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '4px',
    overflowY: 'auto',
  }

  render() {
    const { movies } = this.props;
    return (
      <div style={ MovieList.style }>
        {
          movies.map(m => (
            <MovieListItem movie={ m } />
          ))
        }
      </div>
    );
  }
}
