import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { NOT_FOUND_ERROR } from '../../utils/constants';

function MoviesCardList({movies, savedPage, likeMovie, dislikeMovie, collectionIds, shortMovies, loading}) {
  const [windowDimension, setWindowDimension] = useState();
  const [initMoviesNum, setInitMoviesNum] = useState();
  const [moviesNum, setMoviesNum] = useState(initMoviesNum);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const inCollection = (id) => (!!collectionIds.filter((item) => ( item.numId === id))?.length);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowDimension <= 444) {
      setInitMoviesNum(5);
      setMoviesNum(5);
    } else if (windowDimension <= 768) {
      setInitMoviesNum(8);
      setMoviesNum(8);
    } else {
      setInitMoviesNum(16);
      setMoviesNum(16);
    }
  }, [windowDimension]);

  useEffect(() => {
    if (!movies?.length) {
      setFilteredMovies([]);
    } else if (savedPage) {
      setFilteredMovies(movies);
    } else if (shortMovies) {
      setFilteredMovies(movies.filter((movie) => movie.duration < 40).slice(0, moviesNum));
    } else {
      setFilteredMovies(movies.slice(0, moviesNum));
    }
  }, [movies, moviesNum, shortMovies, savedPage]);

  const addMovies = () => {
    setMoviesNum(moviesNum + initMoviesNum);
  }

  return (
    <>
      {loading && <Preloader />}
      {
        !loading && !filteredMovies?.length &&
        <p className='profile__textlink profileEdit__text'>{NOT_FOUND_ERROR}</p>
      }
      {
        !loading &&
        <div className='moviesCardList'>
          <div className='moviesCardList__grid'>
            {
              filteredMovies &&
              filteredMovies.map((movie, index) => (
                <MoviesCard key={ `movie-${index}` } movie={ movie } savedPage={savedPage} likeMovie={likeMovie} dislikeMovie={dislikeMovie} liked={inCollection(movie.id)}/>
              ))
            }
          </div>
          {
            filteredMovies && movies?.length > moviesNum && !savedPage &&
            <button className='moviesCardList__button-else' onClick={addMovies}>Ещё</button>
          }
        </div>
      }
    </>
  );
}

export default MoviesCardList;
