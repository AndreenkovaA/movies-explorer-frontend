import React, {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import Account from '../Account/Account.js';

function Header(props) {
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMobileMenuButtonClick = () => {
    props.setShowMobileMenu(!props.showMobileMenu);
  }

  const isMobile = windowDimension <= 768;

  return (
    <header className={`header${props.loggedIn ? ' header_type_profile' : ''}`}>
      <div className='element header__elements'>
      <div className='header__logo'></div>
        {
          props.loggedIn &&
          <>
          {
            isMobile &&
            <button
              className='header__button-menu'
              onClick={onMobileMenuButtonClick}
            />
          }
          {
            !isMobile &&
            <>
              <div className='header__nav'>
                <NavLink to='/movies' className="header__link-nav" style={({ isActive }) => {return {fontWeight: isActive ? "500" : "400"};}}>Фильмы</NavLink>
                <NavLink to='/saved-movies' className="header__link-nav" style={({ isActive }) => {return {fontWeight: isActive ? "500" : "400"};}}>Сохраненные фильмы</NavLink>
              </div>
              <Link to='/profile' className='header__group'>
                <Account />
              </Link>
            </>
          }
        </>         
      }
      {!props.loggedIn &&
        <div className='header__group'>
          <Link to={props.routeup} onClick={props.signOut} className="header__link-registr">{props.linkregister}</Link>
          <Link to={props.routein} onClick={props.signOut} className="header__link-exit">{props.linkexit}</Link>
        </div>
          
        }
      </div>      
    </header >
  );
}

export default Header;