import React, { Component } from 'react';
import { getDetail } from '../api';

export default class MovieDetail extends Component {
  state = {};

  static style = {
    display: 'flex',
  };

  static posterStyle = {
    margin: '20px',
  };

  static infoStyle = {

  };

  static formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
      }
    );
  }

  componentDidMount() {
    const {
      match: {
        params: {
          movieId,
        } = {},
      } = {},
    } = this.props;

    getDetail(movieId).catch(e => {
      this.setState({
        error: 'Error getting more info about that movie',  
      });
    }).then(([movie, credits, similar] = []) => {
      const { results: similarMovies } = similar;
      this.setState({
        movie,
        credits,
        similarMovies,
      });
    })
  }

  render() {
    const {
      movie: {
        title,
        tagline,
        overview,
        poster_path,
        release_date: releaseDate,
      } = {},
      credits: {
        cast = [],
      } = {},
    } = this.state;
    return (
      <div style={ MovieDetail.style }>
        <img
          alt={ title }
          style={ MovieDetail.posterStyle }
          src={ `https://image.tmdb.org/t/p/w342/${ poster_path }` }
        />
        <div>
          <h1>{ title }</h1>
          <h3>{ tagline }</h3>
          <h4>Released: {
            releaseDate
            ? MovieDetail.formatDate(releaseDate)
            : 'Unknown'
          }</h4>
          <p>{ overview }</p>
        </div>
        <div>
          {
            cast.slice(0, 10).map(castMember => (
              <div>
                Character: { castMember.character }
                Name: { castMember.name }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
