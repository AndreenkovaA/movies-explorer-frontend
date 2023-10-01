import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { emailIsValid, passwordIsValid } from '../../utils/utils';
import { EMAIL_IS_NOT_VALID, PASSWORD_IS_NOT_VALID } from '../../utils/constants';

const Login = ({onLogin, loading, loginStatus, loggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onInputChange = (e, func) => {
    func(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitDisable()) {
      return;
    }
    onLogin(email, password);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, []);

  const submitDisable = () => (!emailIsValid(email) || !passwordIsValid(password));

  return (
    <>
      {loading && <Preloader/>}
      {
      !loading &&
      <div className="auth">
        <Link to='/' className='auth__logo'></Link>
        <p className="auth__title auth__title_type_auth">Рады видеть!</p>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className='auth__field'>
            E-mail
            <input className="auth__input" id="email" name="email" type="email" onChange={(e) => onInputChange(e, setEmail)} required />
          </div>
          <div className='auth__error'>
            {
              !!email.length && !emailIsValid(email) &&
              <p className='auth__error-text'>{EMAIL_IS_NOT_VALID}</p>
            }
          </div>
          <div className='auth__field'>
            Пароль
            <input className="auth__input" id="password" name="password" type="password" onChange={(e) => onInputChange(e, setPassword)} required />
          </div>
          <div className='auth__error'>
            {
              !!password.length && !passwordIsValid(password) &&
                <p className='auth__error-text'>{PASSWORD_IS_NOT_VALID}</p>
            }
          </div>
          <div className='auth__container auth__container_type_login'>
            {
              loginStatus &&
              <p className='auth__texterror'>{loginStatus}</p>
            }
          </div>
          <button
            className={`auth__button-submit ${submitDisable() ? 'auth__button-submit_type_disabled' : ''}`}
            type="submit"
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
        <div className="auth__signin">
          <p className="auth__question">Ещё не зарегистрированы?</p>
          <Link to="/signup" className='auth__login-link'>Регистрация</Link>
        </div>
      </div>
      }
    </>

  );
}

export default Login;
