import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MovieListItem extends Component {
  static style = {
    display: 'flex',
    borderBottom: '1px solid #888',
    margin: '6px',
    paddingBottom: '8px',
    height: '96px',
  }
  static titleStyle = {
    color: 'white',
    fontSize: '22px',
    marginBottom: '12px',
  };
  static descStyle = {
    color: 'white',
    fontSize: '16px',
    height: '54px',
    overflow: 'hidden',
  };
  static posterStyle = {
    marginRight: '12px',
    height: '96px',
    maxWidth: '96px',
  }

  render() {
    const {
      movie: {
        poster_path: posterUrl,
        title,
        overview,
        id,
      },
      showDescription = false,
      config: {
        baseUrl,
        posterThumbnailSize,
      } = {},
    } = this.props;

    return (
      <Link
        to={ `/movies/${ id }` }
        style={ MovieListItem.style }
      >
        <img
          alt={ title }
          src={ `${ baseUrl }${ posterThumbnailSize }${ posterUrl }` }
          style={ MovieListItem.posterStyle }
        />
        <div>
          <div style={ MovieListItem.titleStyle }>{ title }</div>
          {
            showDescription &&
            <div style={ MovieListItem.descStyle }>{ overview }</div>
          }
        </div>
      </Link>
    );
  }
}
