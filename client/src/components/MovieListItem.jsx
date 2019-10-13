import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MovieListItem extends Component {
  static style = {
    display: 'flex',
    borderBottom: '1px solid #888',
    margin: '6px',
    paddingBottom: '8px',
  }
  static titleStyle = {
    color: 'white',
    fontStyle: 'normal',
    textDecoration: 'none',
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
    // TODO get base url form config
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
          <p className="noshow" style={ MovieListItem.titleStyle }>{ overview }</p>
        </div>
      </Link>
    );
  }
}
