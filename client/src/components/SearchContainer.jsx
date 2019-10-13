import React, { Component } from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";

import Search from './Search';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import ErrorMessage from './ErrorMessage';

import { getPopular, searchByTitle, } from '../api';

export default class SearchContainer extends Component {
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

  getBaseImageUrl(thumbnail = true) {
    // const { }
    // extract min width iff thumbnail
    return '';
  }

  render() {
    const { movies, error } = this.state;

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
          <Route path="/movies/:movieId" component={ MovieDetail } />
          <Route>
            <MovieList movies={ movies } />
          </Route>
        </Switch>
      </div>
    );
  }
}