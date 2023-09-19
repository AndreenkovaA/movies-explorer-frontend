import React from 'react';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__elements'>
        <p className='portfolio__title'>Портфолио</p>
        <a href='https://github.com/AndreenkovaA/how-to-learn' target='blank' className='portfolio__group'>
          <h2 className='portfolio__textlink'>Статичный сайт</h2>
          <div className='portfolio__pointer'></div>
        </a>
        <a href='https://github.com/AndreenkovaA/russian-travel' target='blank' className='portfolio__group'>
          <h2 className='portfolio__textlink'>Адаптивный сайт</h2>
          <div className='portfolio__pointer'></div>
        </a>
        <a href='https://github.com/AndreenkovaA/react-mesto-api-full-gha' target='blank' className='portfolio__group'>
          <h2 className='portfolio__textlink'>Одностраничное приложение</h2>
          <div className='portfolio__pointer'></div>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;