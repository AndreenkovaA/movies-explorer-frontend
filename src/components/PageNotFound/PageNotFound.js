import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
   return (
    <div className='pageNotFound'>
      <h1 className='pageNotFound__heading'>404</h1>
      <p className='pageNotFound__text'>Страница не найдена</p>
      <Link to='/signin' className='pageNotFound__link'>Назад</Link> 
    </div>
  );
}

export default PageNotFound;