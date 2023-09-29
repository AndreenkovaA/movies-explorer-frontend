import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { nameIsValid, emailIsValid, passwordIsValid } from '../../utils/utils';
import { NAME_IS_NOT_VALID, EMAIL_IS_NOT_VALID, PASSWORD_IS_NOT_VALID } from '../../utils/constants';

const Register = ({onRegister, loading, registerStatus, loggedIn}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onInputChange = (e, func) => {
    func(e.target.value);
  };

  const onEnter = (e) => {
    e.preventDefault();
    if (submitDisable()) {
      return;
    }
    onRegister(name, email, password);
  };

  const submitDisable = () => (!nameIsValid(name) || !emailIsValid(email) || !passwordIsValid(password));

  return (
    <>
      {loading && <Preloader/>}
      {
        !loading &&
        <div className="auth">
          <Link to='/' className='auth__logo'></Link>
          <p className="auth__title auth__title_type_auth">Добро пожаловать!</p>
          <form className="auth__form">
            <label className='auth__field'>
              Имя
              <input className="auth__input" id="name" name="name" type="name" onChange={(e) => onInputChange(e, setName)} required minLength={2}/>
            </label>
            <div className='auth__error'>
              {
                !!name.length && !nameIsValid(name) &&
                <p className='auth__error-text'>{NAME_IS_NOT_VALID}</p>

              }
            </div>
            <label className='auth__field'>
              E-mail
              <input className="auth__input" id="email" name="email" type="email" onChange={(e) => onInputChange(e, setEmail)} required />
            </label>
            <div className='auth__error'>
              {
                !!email.length && !emailIsValid(email) &&
                  <p className='auth__error-text'>{EMAIL_IS_NOT_VALID}</p>
              }
            </div>
            <lable className='auth__field'>
              Пароль
              <input className="auth__input" id="password" name="password" type="password" onChange={(e) => onInputChange(e, setPassword)} required minLength={8}/>
            </lable>
            <div className='auth__error'>
            {
              !!password.length && !passwordIsValid(password) &&
                <p className='auth__error-text'>{PASSWORD_IS_NOT_VALID}</p>
            }
            </div>
            <div className='auth__container'>
            {
              registerStatus &&
              <p className='auth__texterror'>{registerStatus}</p>
            }
            </div>
            <button className={`auth__button-submit ${submitDisable() ? 'auth__button-submit_type_disabled' : ''}`} type="submit" onClick={onEnter}>Зарегистрироваться</button>
          </form>
          <div className="auth__signin">
            <p className="auth__question">Уже зарегистрированы?</p>
            <Link to="/signin" className='auth__login-link'>Войти</Link>
          </div>
        </div>
      }
    </>
  );
}


export default Register;