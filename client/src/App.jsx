import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import MovieDetail from './components/MovieDetail';
import SearchContainer from './components/SearchContainer';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/movie/:movieId">
            <MovieDetail />
          </Route>
          <Route path="/">
            <SearchContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
