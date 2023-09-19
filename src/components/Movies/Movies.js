import React from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import initialCards from './cardsMovies';

function Movies() {

  return (
    <>
      <SearchForm />
      <div className='elements'>
        <MoviesCardList movies={initialCards} />
      </div>
    </>
  );
}

export default Movies;
