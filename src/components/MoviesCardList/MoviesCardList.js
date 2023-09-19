import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const [windowDimension, setWindowDimension] = useState();
  const [initMoviesNum, setInitMoviesNum] = useState();
  const [moviesNum, setMoviesNum] = useState(initMoviesNum);
  
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
      console.log(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { 
    if (windowDimension <= 444) { 
      setInitMoviesNum(5);
      setMoviesNum(5);
      console.log(window.innerWidth);
    } else if (windowDimension <= 768) { 
      setInitMoviesNum(8);
      setMoviesNum(8);
      console.log(2);
      console.log(windowDimension);
    } else { 
      setInitMoviesNum(16); 
      setMoviesNum(16);
      console.log('base');
      console.log(windowDimension);
    } 
  }, [windowDimension]);  

  const moviesList = () => (props.movies.slice(0, moviesNum));

  const addMovies = () => { 
    setMoviesNum(moviesNum + initMoviesNum);
  }

  return (
    <>
      <div className='moviesCardList'>
      <div className='moviesCardList__grid'>
        {
          moviesList().map((movie, index) => (
            <MoviesCard key={ `movie-${index}` } movie={ movie } savedPage={props.savedPage}/>
          ))
        }
      </div>
    </div>
    <button className='movies__button-else' onClick={addMovies}>Ещё</button>
    </>
  );
}

export default MoviesCardList;
