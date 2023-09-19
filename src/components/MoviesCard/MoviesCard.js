import React, { useState } from 'react';

function MoviesCard(props) {

  const [activeState, setActiveState] = useState(false);

  function handleHeartClick() {
    setActiveState(!activeState);
  }

  return (
    <div className='moviesCard'> 
      <div className='moviesCard__element'>
        <img className='moviesCard__movies' src={ props.movie.link } alt={ props.movie.name } />
        <div className='moviesCard__group'> 
          <h2 className='moviesCard__title'>{props.movie.name}</h2>
          {
            props.savedPage &&
            <button className='moviesCard__button moviesCard__button_type_delete' type="button" onClick={handleHeartClick} />
          }
          {
            !props.savedPage &&
            <button className={`moviesCard__button moviesCard__button_type_heart ${activeState ? 'moviesCard__button_type_active' : ''}`} type="button" onClick={handleHeartClick} />
          }
        </div>
      </div>
      <p className='moviesCard__time'>1ч 42м</p>
    </div>
  );
}

export default MoviesCard;
