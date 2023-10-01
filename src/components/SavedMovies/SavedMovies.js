import React, {useState, useEffect} from 'react';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

function SavedMovies({savedPage, movies, collectionIds, likeMovie, dislikeMovie, searchText, setSearchText, shortMovies, setShortMovies, loading, setLoading}) {
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

  const onSavedMoviesSearch = (text) => {
    localStorage.setItem('savedSearchText', text);
    setSearchText(text);
  };

  return (
    <>
      <SearchForm
        searchText={searchText}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        setLoading={setLoading}
        onSearchSubmit={onSavedMoviesSearch}
        savedPage={true}
      />
      <MoviesCardList
        movies={filteredMovies}
        likeMovie={likeMovie}
        dislikeMovie={dislikeMovie}
        savedPage={savedPage}
        searchText={searchText}
        collectionIds={collectionIds}
        shortMovies={shortMovies}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

export default SavedMovies;
