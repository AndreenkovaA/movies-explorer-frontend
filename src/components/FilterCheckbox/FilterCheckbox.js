import React from 'react';

function FilterCheckbox({shortMovies,setShortMovies}) {
  const handleChange = (e) => {
    setShortMovies(e.target.checked);
    localStorage.setItem('shortMovies', e.target.checked);
  };

  return (
    <>
      <input className='filterCheckbox' type='checkbox' id='switch' onChange={handleChange} checked={shortMovies}/>
      <label className='filterCheckbox-label' htmlFor='switch'></label>
      <p className='filterCheckbox-text'>Короткометражки</p>
    </>
  );
}

export default FilterCheckbox;
