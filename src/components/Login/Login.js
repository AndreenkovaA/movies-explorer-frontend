import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <div className="auth">
      <Link to='/' className='auth__logo'></Link>
      <p className="auth__title auth__title_type_auth">Рады видеть!</p>
      <form className="auth__form">
        <label className='auth__field'>
          E-mail
          <input className="auth__input" id="email" name="email" type="email" required />
        </label>
        <lable className='auth__field'>
          Пароль
          <input className="auth__input" id="password" name="password" type="password" required />
        </lable>
        <div className="auth__button-container">
          <button className='auth__button-submit auth__button-submit_type_login auth__button-submit_type_disabled' type="submit">Войти</button>
        </div>
      </form>
      <div className="auth__signin">
        <p className="auth__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className='auth__login-link'>Регистрация</Link>
      </div>
    </div>
  );
}


export default Login; 