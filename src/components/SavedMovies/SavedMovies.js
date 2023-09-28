import React, {useState, useEffect} from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

function SavedMovies({savedPage, movies, onSearchSubmit, collectionIds, likeMovie, dislikeMovie, searchText, setSearchText, shortMovies, setShortMovies, loading}) {
  const [filteredMovies, setFilteredMovies] = useState(movies || []);

  useEffect(() => {
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
        searchText={searchText}
        setSearchText={setSearchText}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        onSubmit={onSearchSubmit}
      />
      <MoviesCardList
        movies={filteredMovies}
        likeMovie={likeMovie}
        dislikeMovie={dislikeMovie}
        savedPage={savedPage}
        collectionIds={collectionIds}
        shortMovies={shortMovies}
        loading={loading}/>
    </>
  );
}

export default SavedMovies;
