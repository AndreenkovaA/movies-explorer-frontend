import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { NOT_FOUND_ERROR, TRY_TO_FIND, NO_SAVED_MOVIES } from '../../utils/constants';

function MoviesCardList({movies, savedPage, likeMovie, dislikeMovie, collectionIds, shortMovies, loading, searchText, setLoading}) {
  const [windowDimension, setWindowDimension] = useState();
  const [moviesNum, setMoviesNum] = useState(0);
  const [moviesIncNum, setMoviesIncNum] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [slicedMovies, setSlicedMovies] = useState([]);

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
      setMoviesNum(5);
      setMoviesIncNum(2);
    } else if (windowDimension <= 768) {
      setMoviesNum(8);
      setMoviesIncNum(2);
    } else {
      setMoviesNum(16);
      setMoviesIncNum(4);
    }
  }, [windowDimension]);

  useEffect(() => {
    if (!movies?.length) {
      setFilteredMovies([]);
      setSlicedMovies([]);
    } else {
      if (shortMovies) {
        setFilteredMovies(movies.filter((movie) => movie.duration < 40));
        setSlicedMovies(movies.filter((movie) => movie.duration < 40).slice(0, moviesNum));
      } else {
        setFilteredMovies(movies);
        setSlicedMovies(movies.slice(0, moviesNum));
      }
    }
  }, [movies, moviesNum, shortMovies, savedPage]);

  const addMovies = () => {
    setMoviesNum(moviesNum + moviesIncNum);
  }

  const emptyText = () => {
    if (savedPage) {
      if (!searchText?.length) {
        return NO_SAVED_MOVIES;
      } else {
        return NOT_FOUND_ERROR;
      }
    } else {
      if (!searchText?.length) {
        return TRY_TO_FIND;
      } else {
        return NOT_FOUND_ERROR;
      }
    }
  };

  return (
    <>
      {loading && <Preloader />}
      {
        !loading && !filteredMovies?.length &&
        <p className='profile__textlink profileEdit__text'>{emptyText()}</p>
      }
      {
        !loading &&
        <div className='moviesCardList'>
          <div className='moviesCardList__grid'>
            {
              !savedPage && slicedMovies &&
              slicedMovies.map((movie, _index) => (
                <MoviesCard key={ `movie-${movie.id}` } movie={ movie } savedPage={savedPage} likeMovie={likeMovie} dislikeMovie={dislikeMovie} liked={inCollection(movie.id)}/>
              ))
            }
            {
              savedPage && filteredMovies &&
              filteredMovies.map((movie, _index) => (
                <MoviesCard key={ `movie-${movie.id}` } movie={ movie } savedPage={savedPage} likeMovie={likeMovie} dislikeMovie={dislikeMovie} liked={inCollection(movie.id)}/>
              ))
            }
          </div>
          {
            !savedPage && filteredMovies && filteredMovies.length > moviesNum &&
            <button className='moviesCardList__button-else' onClick={addMovies}>Ещё</button>
          }
        </div>
      }
    </>
  );
}

export default MoviesCardList;
