import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

   return (
    <div className='pageNotFound'>
      <h1 className='pageNotFound__heading'>404</h1>
      <p className='pageNotFound__text'>Страница не найдена</p>
      <p className='pageNotFound__link' onClick={() => (navigate(-1))}>Назад</p>
    </div>
  );
}

export default PageNotFound;