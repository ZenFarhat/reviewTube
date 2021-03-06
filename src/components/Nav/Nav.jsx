import React, { useState } from "react";
import MovieList from "../MovieList/MovieList";
import axios from "axios";
import "./Nav.css";

function Nav() {
  const [search, getSearch] = useState("");
  const [searchResults, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const img_url = "https://image.tmdb.org/t/p/w200/";
  const API_KEY = "2e3fbcccb4701cc502ea1a888039b2c8";
  const SEARCH_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&query=" +
    search;

  const handleSearch = () => {
    if (search === "") {
      setResults([]);
      setHasSearched(false);
      return;
    } else {
      axios
        .get(SEARCH_URL)
        .then((res) => {
          const searchedMovie = res.data.results;
          searchedMovie.map((x) => {
            x.showOverview = false;
            return x;
          });
          setResults(searchedMovie);
          console.log(searchedMovie);
        })
        .catch((error) => console.error(`Error: ${error}`));
      setHasSearched(true);
    }
  };

  const displayOverview = (result) => {
    result.showOverview = !result.showOverview;
    let el = document.getElementById(result.id);
    el.style.display = result.showOverview ? "block" : "none";
    console.log(result.showOverview);
  };

  return (
    <div className='appContainer'>
      <nav>
        <div className='nav__logo'>ReviewTube</div>
        <div className='searchbar__container'>
          <input
            type='text'
            onChange={(event) => getSearch(event.target.value)}
            className='nav__searchBar'
          />
          <button className='nav__searchButton' onClick={handleSearch}>
            Search
          </button>
        </div>
      </nav>
      <MovieList
        search={searchResults.map((result) => {
          return (
            <div className='movie' key={result.id}>
              <img
                src={`${img_url + result.poster_path}`}
                alt='movie_poster'
                className='movie__poster'
              />
              <button
                className='overviewButton'
                onClick={() => displayOverview(result)}
              >
                Show Overview
              </button>
              <div className='movie__overview' id={result.id}>
                <p className='movie__title'>{result.title}</p>
                <hr className='purpleHr' />
                <p className='overview'>{result.overview}</p>
                <hr className='purpleHr' />
                <p>Rating: {result.vote_average}</p>
              </div>
            </div>
          );
        })}
        hasSearched={hasSearched}
      />
    </div>
  );
}

export default Nav;
