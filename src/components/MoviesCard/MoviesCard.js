import React from 'react';

function MoviesCard({movie, savedPage, likeMovie, dislikeMovie, liked}) {
  function handleHeartClick() {
      if (liked || savedPage) {
        dislikeMovie(savedPage ? movie.movieId : movie.id);
      } else {
        likeMovie(movie);
      }
  }

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ''}`;
  }

  const handleClick = () => {
    window.open(movie.trailerLink, "_blank");
  }

  return (
    <div className='moviesCard'>
      <div className='moviesCard__element'>
        <img className='moviesCard__movies' src={ savedPage ? movie?.image : `https://api.nomoreparties.co${movie.image?.url}` } alt={ movie.name } onClick={handleClick} />
        <div className='moviesCard__group'>
          <h2 className='moviesCard__title'>{movie.nameRU}</h2>
          {
            savedPage &&
            <button className='moviesCard__button moviesCard__button_type_delete' type="button" onClick={handleHeartClick} />
          }
          {
            !savedPage &&
            <button className={`moviesCard__button moviesCard__button_type_heart ${liked ? 'moviesCard__button_type_active' : ''}`} type="button" onClick={handleHeartClick} />
          }
        </div>
      </div>
      <p className='moviesCard__time'>{toHoursAndMinutes(movie.duration)}</p>
    </div>
  );
}

export default MoviesCard;
