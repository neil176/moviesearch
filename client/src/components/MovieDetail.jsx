import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getDetail } from '../api';

import MovieListItem from './MovieListItem';

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

    this.getData(movieId);
  }

  getData(movieId) {
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
    });
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          movieId: prevMovieId,
        } = {},
      } = {},
    } = prevProps;
    const {
      match: {
        params: {
          movieId: currentMovieId,
        } = {},
      } = {},
    } = this.props;


    if (prevMovieId !== currentMovieId) this.getData(currentMovieId);
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
      similarMovies = [],
    } = this.state;

    return (
      <div>

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
            cast.slice(0, 5).map(castMember => (
              <div>
                Character: { castMember.character }
                Name: { castMember.name }
              </div>
            ))
          }
        </div>
      </div>
      <div style={ { display: 'flex' } }>
        {
          similarMovies.slice(0, 3).map(sm => (
            <Link to={ `/movies/${ sm.id }` }>
              <MovieListItem
                movie={ sm }
              />
            </Link>
          ))
        }
      </div>
      </div>
    );
  }
}
