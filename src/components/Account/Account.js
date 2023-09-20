import React from 'react';
import { Link } from 'react-router-dom';

function Account(props) {
  return (
    <Link to='/profile' className={`account${props.headerPop ? ' account_type_popup' : ''}`}>
      <div className='account__link'>Аккаунт</div>
      <div className='account__icon'></div>
    </Link>
  );
}

export default Account;