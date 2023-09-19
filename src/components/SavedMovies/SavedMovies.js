import React from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import initialCards from './savedCards';

function SavedMovies(props) {

  return (
    <>
      <SearchForm />
      <div className='elements'>
        <MoviesCardList movies={initialCards} savedPage={props.savedPage} />
      </div>
    </>
  );
}

export default SavedMovies;
