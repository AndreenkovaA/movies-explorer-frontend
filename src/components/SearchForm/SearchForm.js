import React, {useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({searchText, shortMovies, setShortMovies, setLoading, onSearchSubmit}) {
  const [windowDimension, setWindowDimension] = useState(null);
  const [inputValue, setInputValue] = useState(searchText);

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

  const isMobile = windowDimension <= 500;

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    onSearchSubmit(inputValue);
    setLoading(false);
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {
        isMobile &&
        <div className='searchForm'>
          <form className='searchForm__search-input' method='POST' onSubmit={handleSubmit}>
              <input className="searchForm__input" value={ inputValue } onChange={onInputChange} id="movies" name="movies" type="submit" placeholder='Фильм' required />
            <button className='searchForm__button-search' type='submit' onClick={ handleSubmit }>Найти</button>
          </form>
          <div className='searchForm__container'>
            <FilterCheckbox shortMovies={shortMovies} setShortMovies={setShortMovies}/>
          </div>
        </div>
      }
      {
        !isMobile &&
        <div className='searchForm'>
          <div className='searchForm__search-input'>
            <div className='searchForm__icon'></div>
            <input className="searchForm__input" id="movies" name="movies" type="movies" placeholder='Фильм' value={ inputValue } onChange={onInputChange} required />
            <div className='searchForm__vertical-line'>
              <button className='searchForm__button-search' type='button' onClick={ handleSubmit }>Найти</button>
            </div>
            <div className='searchForm__container'>
              <FilterCheckbox shortMovies={shortMovies} setShortMovies={setShortMovies}/>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default SearchForm;
