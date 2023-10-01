import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import { nameIsValid, emailIsValid } from '../../utils/utils';
import { EMAIL_IS_NOT_VALID, NAME_IS_NOT_VALID } from '../../utils/constants';

const ProfileEdit = ({onEdit, updateUserStatus, loading}) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const onInputChange = (e, func) => {
    func(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitDisable()) {
      return;
    }
    onEdit(name, email);
  };

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const submitDisable = () => (!emailIsValid(email) || !nameIsValid(name) || (email === currentUser.email && name === currentUser.name));

  return (
    <>
      {loading && <Preloader/>}
      {
        !loading &&
        <div className='profile'>
          <p className='profile__title'>{`Привет, ${currentUser.name || ''}!`}</p>
          <form method='POST' onSubmit={handleSubmit}>
            <div className='profile__group'>
              <p className='profile__text'>Имя</p>
              <input className='profile__text profile__text_type_userdata profileEdit__input' value={name} onChange={(e) => onInputChange(e, setName)} id="name" name="name" type="name" minLength={2} />
            </div>
            {
              name !== undefined && !!name.length && !nameIsValid(name) &&
              <div className='auth__error'>
                <p className='auth__error-text'>{NAME_IS_NOT_VALID}</p>
              </div>
            }
            <div className='profile__group'>
              <p className='profile__text'>Почта</p>
              <input className='profile__text profile__text_type_userdata profileEdit__input' value={email} onChange={(e) => onInputChange(e, setEmail)} id="email" name="email" type="email" minLength={2} />
            </div>
            {
              email !== undefined && !!email.length && !emailIsValid(email) &&
              <div className='auth__error'>
                <p className='auth__error-text'>{EMAIL_IS_NOT_VALID}</p>
              </div>
            }
          </form>
          <div className='profileEdit__container'>
            {
              updateUserStatus &&
              <p className='profile__textlink profileEdit__text'>{updateUserStatus}</p>
            }
          </div>
          <button className={`profileEdit__button-submit ${submitDisable() ? 'profileEdit__button-submit_type_disabled' : ''}`} type="submit" onClick={ handleSubmit }>Сохранить</button>
        </div>
      }
    </>

  );
}


export default ProfileEdit;