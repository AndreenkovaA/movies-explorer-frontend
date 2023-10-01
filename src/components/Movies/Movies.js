import React, { useEffect, useState } from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({movies, likeMovie, dislikeMovie, collectionIds, searchText, setSearchText, shortMovies, setShortMovies, loading, setLoading, onSearchSubmit}) {
  const [filteredMovies, setFilteredMovies] = useState(movies || []);

  useEffect(() => {
    setFilteredMovies([]);
    if (!!searchText.length && !!movies?.length) {
      const filtered = movies.filter((item) => (
        item.nameRU.toLowerCase().includes(searchText.toLowerCase()) || item.nameEN.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([])
    }
  }, [movies, searchText]);

  const onMoviesSearch = (text) => {
    localStorage.setItem('searchText', text);
    setSearchText(text);
    onSearchSubmit();
  };

  return (
    <>
      <SearchForm
        searchText={searchText}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        setLoading={setLoading}
        onSearchSubmit={onMoviesSearch}
      />
      <MoviesCardList
        movies={filteredMovies}
        likeMovie={likeMovie}
        dislikeMovie={dislikeMovie}
        collectionIds={collectionIds}
        searchText={searchText}
        shortMovies={shortMovies}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

export default Movies;
