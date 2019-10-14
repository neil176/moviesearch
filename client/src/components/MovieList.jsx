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
    overflow: 'hidden',
  }

  render() {
    const { movies, config } = this.props;
    return (
      <div style={ MovieList.style }>
        {
          movies.map(m => (
            <MovieListItem
              config={ config }
              movie={ m }
              showDescription
            />
          ))
        }
      </div>
    );
  }
}
