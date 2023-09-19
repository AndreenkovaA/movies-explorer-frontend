import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  return (
    <div className="auth">
      <div className='auth__container'>
        <div className='header__logo header__logo_type_auth'></div>
        <p className="auth__title auth__title_type_auth">Добро пожаловать!</p>
      </div>
      <form className="form__auth">
        <label className='auth__field'>
          Имя
          <input className="auth__input" id="name" name="name" type="name" required minLength={2}/>
        </label>
        <label className='auth__field'>
          E-mail
          <input className="auth__input" id="email" name="email" type="email" required />
        </label>
        <lable className='auth__field'>
          Пароль
          <input className="auth__input" id="password" name="password" type="password" required minLength={8}/>
        </lable>
        <div className="auth__button-container">
          <button className='auth__button-submit auth__button-submit_type_register auth__button-submit_type_disabled' type="submit">Зарегистрироваться</button>
        </div>
      </form>
      <div className="auth__signin">
        <p className="auth__question">Уже зарегистрированы?</p>
        <Link to="/signin" className='auth__login-link'>Войти</Link>
      </div>
    </div>
  );
}


export default Register; 