import React, {useState, useEffect} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  const [windowDimension, setWindowDimension] = useState(null);

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

  return (
    <>
      {isMobile &&
        <div className='searchForm'>
          <div className='searchForm__search-input'>
            <input className="searchForm__input" id="movies" name="movies" type="movies" placeholder='Фильм' required />
            <button className='searchForm__button-search' type='button'>Найти</button>
          </div>
          <div className='searchForm__container'>
            <FilterCheckbox />
          </div>
        </div>
      }
      {
        !isMobile &&
        <div className='searchForm'>
          <div className='searchForm__search-input'>
            <div className='searchForm__icon'></div>
            <input className="searchForm__input" id="movies" name="movies" type="movies" placeholder='Фильм' required />
            <div className='searchForm__vertical-line'>
              <button className='searchForm__button-search' type='button'>Найти</button>
            </div>
            <div className='searchForm__container'>
              <FilterCheckbox />
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default SearchForm;
