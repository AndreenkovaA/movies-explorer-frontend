import React from 'react';

function AboutProject() {
  return (
    <section className='aboutProject'>
        <div className='aboutProject__elements'>
          <h2 className='aboutProject__title'>О проекте</h2>
          <div className='aboutProject__container'>
            <div className='aboutProject__cell'>
              <h3 className='aboutProject__heading'>Дипломный проект включал 5 этапов</h3>
              <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='aboutProject__cell'>
              <h3 className='aboutProject__heading'>На выполнение диплома ушло 5 недель</h3>
              <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className='aboutProject__group'>
            <div>
              <p className='aboutProject__text aboutProject__text_color_black'>1 неделя</p>
            </div>
            <div>
              <p className='aboutProject__text aboutProject__text_color_white'>4 недели</p>
            </div>
            <p className='aboutProject__text aboutProject__text_color_grey'>Back-end</p>
            <p className='aboutProject__text aboutProject__text_color_grey'>Front-end</p>
          </div>
        </div>
      </section>
  );
}

export default AboutProject;