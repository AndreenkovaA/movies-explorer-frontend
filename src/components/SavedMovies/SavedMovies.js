import React from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import initialCards from './savedCards';

function SavedMovies(props) {

  return (
    <>
      <SearchForm />
      <MoviesCardList movies={initialCards} savedPage={props.savedPage} />
    </>
  );
}

export default SavedMovies;
