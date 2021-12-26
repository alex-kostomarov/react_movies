import React from 'react';
import './App.scss';
import { Movie } from './types';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface State {
  movies: Movie[];
  query: string;
}

export class App extends React.Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
    query: '',
  };

  addMovie = (movie: Movie) => {
    this.setState(state => ({
      movies: [...state.movies, movie],
    }));
  };

  getMoviesList = (searchQuery: string) => (
    this.state.movies.filter(movie => {
      return movie.title.toLocaleLowerCase().includes(searchQuery)
        || movie.description.toLocaleLowerCase().includes(searchQuery);
    })
  );

  handleSearchQuery = (value:string) => {
    this.setState({ query: value });
  };

  render() {
    const { query } = this.state;
    const searchQuery = query.toLocaleLowerCase();
    const visibleMovies = this.getMoviesList(searchQuery);

    return (
      <div className="page">
        <div className="page-content">
          <div className="search">
            <label htmlFor="search-query" className="label">
              Search movie

              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={event => this.handleSearchQuery(event.target.value)}
              />
            </label>
          </div>

          <MoviesList movies={visibleMovies} />
        </div>

        <div className="sidebar">
          <h2>Add movie</h2>
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}
