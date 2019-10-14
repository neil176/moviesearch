import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Search from './Search';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import ErrorMessage from './ErrorMessage';

import { getPopular, searchByTitle, getConfig, } from '../api';

export default class SearchContainer extends Component {
  static DEFAULT_CONFIG = {
    baseUrl: 'https://image.tmdb.org/t/p/',
    posterThumbnailSize: 'w92',
    posterDetailSize: 'w342',
  };

  static style = {
    width: '62%',
    marginTop: '2%',
  };

  state = {
    movies: [],
    query: '',
    error: null,
    config: {},
  };

  handleResults = (data = {}) => {
    const { results: movies } = data;
    this.setState({
      movies,
      error: null,
    });
  }

  componentDidMount() {
    getConfig()
      .catch(() => {
        // attempt to use defaults since these seem unlikely to change regularly
        // and, at worst, break image links on a failure to fetch config
        this.setState({
          config: SearchContainer.DEFAULT_CONFIG,
        });
      })
      .then(config => {
        this.setState({
          config,
        });
      })
    getPopular()
      .catch(() => this.setState({
          error: 'Error retrieving popular movies',
      }))
      .then(this.handleResults);
  }

  handleSearch = query => {
    searchByTitle(query)
      .catch(() => this.setState({
          error: 'Error searching movies',
      }))
      .then(this.handleResults);
  }

  render() {
    const { movies, error, config } = this.state;

    return (
      <div style={ SearchContainer.style }>
        <Route
          children={ ({ history }) => (
            <Search
              history={ history }
              onSearch={ this.handleSearch }
            />
          ) }
        />
        { error && <ErrorMessage msg={ error } /> }
        <Switch>
          <Route path="/movies/:movieId"
            children={ ({ match }) => (
              <MovieDetail
                match={ match }
                config={ config }
              /> 
            ) }
          />
          <Route>
            <MovieList
              movies={ movies }
              config={ config }
            />
          </Route>
        </Switch>
      </div>
    );
  }
}