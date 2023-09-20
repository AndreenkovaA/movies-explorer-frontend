import React from 'react';
import { NavLink } from 'react-router-dom';
import Account from '../Account/Account';

function Popup(props) {
  const onClosePopup = () => {
    props.setShowMobileMenu(false);
  }

  return (
    <div className={`popup${props.showMobileMenu ? ' popup_opened' : ''}`}>
      <button className='popup__icon-close' onClick={onClosePopup} />
      <NavLink to='/' className='popup__link' style={({ isActive }) => {return {textDecoration: isActive ? "underline" : "none"};}}>Главная</NavLink>
      <NavLink to='/movies' className='popup__link' style={({ isActive }) => {return {textDecoration: isActive ? "underline" : "none"};}}>Фильмы</NavLink>
      <NavLink to='/saved-movies' className='popup__link' style={({ isActive }) => {return {textDecoration: isActive ? "underline" : "none"};}}>Сохраненные фильмы</NavLink>
      <Account headerPop/>
    </div>
  );
}

export default Popup;