import React from 'react';

function FilterCheckbox(props) {

  return (
    <>
      <input className='filterCheckbox' type='checkbox' id='switch' />
      <label className='filterCheckbox-label' htmlFor='switch'></label>
      <p className='filterCheckbox-text'>Короткометражки</p>
    </>
  );
}

export default FilterCheckbox;
