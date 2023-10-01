import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Account(props) {
  const location = useLocation();

  return (
    <Link to='/profile' className={`account${props.headerPop ? ' account_type_popup' : ''}`}>
      <div className='account__link'>Аккаунт</div>
      <div className={`account__icon${location.pathname === '/' ? ' account__icon_type_landing' : ''}`}></div>
    </Link>
  );
}

export default Account;