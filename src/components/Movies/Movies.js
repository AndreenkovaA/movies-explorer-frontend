import React, { useEffect, useState } from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

function Movies({onSearchSubmit, movies, likeMovie, dislikeMovie, collectionIds, searchText, setSearchText, shortMovies, setShortMovies, loading}) {
  const [filteredMovies, setFilteredMovies] = useState(movies || []);

  useEffect(() => {
    setFilteredMovies([]);
    if (!!searchText.length && !!movies?.length) {
      const filtered = movies.filter((item) => (
        item.nameRU.toLowerCase().includes(searchText.toLowerCase()) || item.nameEN.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(!!movies?.length ? movies : {})
    }
  }, [movies, searchText]);

  return (
    <>
      <SearchForm
        onSubmit={onSearchSubmit}
        searchText={searchText}
        setSearchText={setSearchText}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
      />
      <MoviesCardList
        movies={filteredMovies}
        likeMovie={likeMovie}
        dislikeMovie={dislikeMovie}
        collectionIds={collectionIds}
        searchText={searchText}
        shortMovies={shortMovies}
        loading={loading}
      />
    </>
  );
}

export default Movies;
