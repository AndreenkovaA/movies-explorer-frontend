import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js'
import Profile from '../Profile/Profile.js'
import PageNotFound from '../PageNotFound/PageNotFound.js'
import Popup from '../Popup/Popup.js';

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/" element={
          <>
            <Header
              routein="/signin"
              linkexit="Войти"
              routeup="/signup"
              linkregister="Регистрация"
            />
            <Main />
            <Footer />
          </>
        }
        />
        <Route path="/movies" element={
          <>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn/>
            <Movies />
            <Footer />
          </>
          }
        />
        <Route path="/saved-movies" element={
          <>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn/>
            <SavedMovies savedPage />
            <Footer />
          </>
          }
        />
        <Route path="/profile" element={
          <>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn route/>
            <Profile />
          </>
        }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}


export default App;
