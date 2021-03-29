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
  }, [pageNumber, hasSearched]);

  const searchResults = props.search;
  const getAllMovies = () => {
    axios
      .get(url)
      .then((res) => {
        const allMovies = res.data.results;
        allMovies.map((x) => {
          x.showOverview = false;
          return x;
        });
        getMovies(allMovies);
        console.log(allMovies);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  var hasSearched = props.hasSearched;

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

  const displayOverview = (movie) => {
    movie.showOverview = !movie.showOverview;
    let el = document.getElementById(movie.id);
    el.style.display = movie.showOverview ? "block" : "none";
    console.log(movie.showOverview);
  };

  function refreshPage() {
    setPage(1);
    window.location.reload();
  }

  return (
    <div className='movieList'>
      {hasSearched ? (
        <>
          <div className='search__header'>
            <h1 className='search__results'>Your search results</h1>
            <button onClick={refreshPage} className='refresh__button'>
              Refresh
            </button>
          </div>
          <hr />
          <div className='movies'>{searchResults}</div>
        </>
      ) : (
        <>
          <div className='page__buttons'>
            <button
              className='decrementPage pageButton'
              onClick={decrementPage}
            >
              Prev Page
            </button>
            <p>{pageNumber}</p>
            <button
              className='incrementPage pageButton'
              onClick={incrementPage}
            >
              Next Page
            </button>
          </div>
          <div className='movies'>
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
                    <button
                      className='overviewButton'
                      onClick={() => displayOverview(movie)}
                    >
                      Show Overview
                    </button>
                  </div>
                  <div className='movie__overview' id={movie.id}>
                    <p className='overview'>{movie.overview}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='page__buttons'>
            <button
              className='decrementPage pageButton'
              onClick={decrementPage}
            >
              Prev Page
            </button>
            <p>{pageNumber}</p>
            <button
              className='incrementPage pageButton'
              onClick={incrementPage}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieList;
