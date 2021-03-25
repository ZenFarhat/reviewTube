import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieList.css";

function MovieList(props) {
  const [movieList, getMovies] = useState([]);
  const [pageNumber, setPage] = useState(1);

  const api_key = "2e3fbcccb4701cc502ea1a888039b2c8";
  const url =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
    api_key +
    "&page=" +
    pageNumber;
  const img_url = "https://image.tmdb.org/t/p/w200/";

  useEffect(() => {
    getAllMovies();
  }, [pageNumber]);

  const searchResults = props.search;

  const getAllMovies = () => {
    axios
      .get(url)
      .then((res) => {
        const allMovies = res.data.results;
        getMovies(allMovies);
        console.log(allMovies);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const decrementPage = () => {
    if (pageNumber <= 1) {
      return;
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='movieList'>
      <div className='page__buttons'>
        <button className='decrementPage pageButton' onClick={decrementPage}>
          Prev Page
        </button>
        <p>{pageNumber}</p>
        <button className='incrementPage pageButton' onClick={incrementPage}>
          Next Page
        </button>
      </div>
      <div className='movies'>
        {searchResults}
        {movieList.map((movie) => {
          return (
            <div className='movie' key={movie.id}>
              <img
                src={`${img_url + movie.backdrop_path}`}
                alt=''
                className='movie__backdrop'
              />
              <div className='movie__container'>
                <img
                  src={`${img_url + movie.poster_path}`}
                  alt='movie_poster'
                  className='movie__poster'
                />

                <p>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='page__buttons'>
        <button className='decrementPage pageButton' onClick={decrementPage}>
          Prev Page
        </button>
        <p>{pageNumber}</p>
        <button className='incrementPage pageButton' onClick={incrementPage}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default MovieList;
