import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {

  return (
    <>
      <div className='profile'>
        <p className='auth__title auth__title_type_profile'>Привет, Анастасия!</p>
        <div>
          <div className='profile__group'>
            <p className='profile__text'>Имя</p>
            <p className='profile__text profile__text_type_userdata'>Анастасия</p>
          </div>
          <div className='profile__group'>
            <p className='profile__text'>E-mail</p>
            <p className='profile__text profile__text_type_userdata'>Andreenkova26@list.ru</p>
          </div>
        </div>
        <p className='profile__textlink profile__textlink_type_edit'>Редактировать</p>
        <Link to='/signin' className='profile__textlink profile__textlink_type_exit'>Выйти из аккаунта</Link>
      </div>
    </>
  
  );
}


export default Profile; 