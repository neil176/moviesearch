import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MovieListItem extends Component {
  static style = {
    display: 'flex',
    borderBottom: '1px solid #888',
    margin: '6px',
    paddingBottom: '8px',
    height: '8%',
  }
  static titleStyle = {
    color: 'white',
    fontSize: '22px',
    marginBottom: '12px',
  };
  static descStyle = {
    color: 'white',
    fontSize: '16px',
    maxHeight: '128px',
    overflow: 'hidden',
  };
  static posterStyle = {
    marginRight: '12px',
  }

  render() {
    const {
      movie: {
        poster_path: posterUrl,
        title,
        overview,
        id,
      }
    } = this.props;

    // TODO get base url from config
    return (
      <Link
        to={ `/movies/${ id }` }
        style={ MovieListItem.style }
      >
        <img
          alt={ title }
          src={ `https://image.tmdb.org/t/p/w92${ posterUrl }` }
          style={ MovieListItem.posterStyle }
        />
        <div>
          <div style={ MovieListItem.titleStyle }>{ title }</div>
          <div style={ MovieListItem.descStyle }>{ overview }</div>
        </div>
      </Link>
    );
  }
}
