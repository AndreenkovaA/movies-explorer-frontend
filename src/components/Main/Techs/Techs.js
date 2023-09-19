import React from 'react';

function Techs() {
  return (
    <section className='techs'>
        <div className='techs__elements'>
          <h2 className='techs__title'>Технологии</h2>
          <div>
            <h3 className='techs__heading'>7 технологий</h3>
            <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          </div>
          <div className='techs__group'>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>HTML</p>
            </div>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>CSS</p>
            </div>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>JS</p>
            </div>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>React</p>
            </div>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>Git</p>
            </div>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>Express.js</p>
            </div>
            <div className='techs__cell'>
              <p className='techs__text techs__text_type_cell'>mongoDB</p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Techs;