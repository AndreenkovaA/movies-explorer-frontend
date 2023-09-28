import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({loggedIn, onLogOut}) => {
  const {currentUser} = useContext(CurrentUserContext);

  const handleLogout = () => {
    onLogOut();
  };

  return (
    <>
      <div className='profile'>
        <p className='profile__title'>{`Привет, ${currentUser.name}!`}</p>
        <div>
          <div className='profile__group'>
            <p className='profile__text'>Имя</p>
            <p className='profile__text profile__text_type_userdata'>{currentUser.name}</p>
          </div>
          <div className='profile__group'>
            <p className='profile__text'>E-mail</p>
            <p className='profile__text profile__text_type_userdata'>{currentUser.email}</p>
          </div>
        </div>
        <Link to="/edit" className='profile__textlink profile__textlink_type_edit'>Редактировать</Link>
        <p className='profile__textlink profile__textlink_type_exit' onClick={handleLogout}>Выйти из аккаунта</p>
      </div>
    </>

  );
}


export default Profile;
