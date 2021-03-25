import React, { useState } from "react";
import MovieList from "../MovieList/MovieList";
import axios from "axios";
import "./Nav.css";

function Nav() {
  const [search, getSearch] = useState("");
  const [searchResults, setResults] = useState([]);
  const img_url = "https://image.tmdb.org/t/p/w200/";
  const API_KEY = "2e3fbcccb4701cc502ea1a888039b2c8";
  const SEARCH_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&query=" +
    search;

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      axios
        .get(SEARCH_URL)
        .then((res) => {
          const searchedMovie = res.data.results;
          setResults(searchedMovie);
          console.log(searchedMovie);
        })
        .catch((error) => console.error(`Error: ${error}`));
    }
  };

  return (
    <div className='appContainer'>
      <nav>
        <div className='nav__logo'>ReviewTube</div>
        <div className='searchbar'>
          <input
            type='text'
            onChange={(event) => getSearch(event.target.value)}
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
                src={`${img_url + result.backdrop_path}`}
                alt=''
                className='movie__backdrop'
              />
              <div className='movie__container'>
                <img
                  src={`${img_url + result.poster_path}`}
                  alt='movie_poster'
                  className='movie__poster'
                />

                <p>{result.title}</p>
                <p>Rating: {result.vote_average}</p>
              </div>
            </div>
          );
        })}
      />
    </div>
  );
}

export default Nav;