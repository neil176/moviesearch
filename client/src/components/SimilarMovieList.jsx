import React, { Component } from 'react';
import SimilarMovieListItem from './SimilarMovieListItem';


export default class SimilarMovieList extends Component {
  static style = {
    display: 'flex',

  }
  render() {
    return (
      <div style={ SimilarMovieList.style }>
        {
          movies.map(movie => <SimilarMovieListItem />)
        }
      </div>
    );
  }
}