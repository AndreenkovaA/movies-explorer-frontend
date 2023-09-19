import React from 'react';
import photoAvatar from '../../../images/__avatar.jpg';

function AboutMe() {
  return (
  <section className='aboutMe'>
    <div className='aboutMe__elements'>
      <h2 className='aboutProject__title'>Студент</h2>
      <div className='aboutMe__element'>
        <div className='aboutMe__group'>
          <div className='aboutMe__container'>
            <h3 className='aboutMe__heading'>Анастасия</h3>
            <h4 className='aboutMe__subtitle'>Фронтенд-разработчик, 33 года</h4>
            <p className='aboutMe__text'>Я живу в Москве, закончила факультет энергомашиностроения МЭИ. У меня есть муж и сын. Я люблю слушать музыку, читать и путешествовать. Недавно начала кодить. С 2013 года работала в компании «ВНИИАЭС». После того, как прошла курс по веб-разработке, начала заниматься фриланс-заказами и ушла с постоянной работы.</p>
          </div>
          <a href='https://github.com/AndreenkovaA' target='blank' className='aboutMe__text aboutMe__text_type_link'>Github</a>
        </div>
        <img className='aboutMe__avatar' src={photoAvatar} alt="фото пользователя"/>
      </div>
    </div>
  </section>
  );
}

export default AboutMe;