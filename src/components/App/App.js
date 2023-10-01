import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js'
import Profile from '../Profile/Profile.js'
import ProfileEdit from'../ProfileEdit/ProfileEdit.js'
import PageNotFound from '../PageNotFound/PageNotFound.js'
import Popup from '../Popup/Popup.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { getMovies } from '../../utils/MoviesApi.js';
import { autorize, register, checkToken, addMovie, removeMovie, getSavedMovies, updateUser } from '../../utils/MainApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import {
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  LOGIN_ERROR,
  REGISTER_ERROR
 } from '../../utils/constants.js';

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesCollection, setMoviesCollection] = useState(JSON.parse(localStorage.getItem('collection')) || []);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('shortMovies')) || false);
  const [shortSavedMovies, setShortSavedMovies] = useState(JSON.parse(localStorage.getItem('shortSavedMovies')) || false);
  const [searchText, setSearchText] = useState(localStorage.getItem('searchText') || '');
  const [savedSearchText, setSavedSearchText] = useState(localStorage.getItem('savedSearchText') || '');
  const [updateUserStatus, setUpdateUserStatus] = useState('')
  const [registerStatus, setRegisterStatus] = useState('')
  const [loginStatus, setLoginStatus] = useState('')

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token') || false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  const moviesIds = moviesCollection.map((item) => ({ numId: item.movieId, hexId: item._id }));
  const [collectionIds, setCollectionIds] = useState(moviesIds);

  const onSearchSubmit = () => {
    if (!movies.length) {
      getMoviesData();
    }
  };

  const getMoviesData = async (isLoggedIn = false) => {
    if (isLoggedIn && !!searchText.length) {
      const films = localStorage.getItem('movies');
      setMovies(JSON.parse(films));
      return;
    }
    try {
      const movies = await getMovies();
      localStorage.setItem('movies', JSON.stringify(movies));
      setMovies(movies);
    }
    catch (err) {
      console.log('err');
    }
  }

  const getCollection = async () => {
    try {
      const collection = await getSavedMovies();
      localStorage.setItem('collection', JSON.stringify(collection.data));
      setMoviesCollection(collection.data);
      setCollectionIds(collection.data.map((item) => ({ numId: item.movieId, hexId: item._id })));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    try {
      const user = await register(name, email, password);
      const tokenData = await autorize(email, password);
      localStorage.setItem('token', tokenData.token);
      setCurrentUser(user.data);
      setLoggedIn(true);
      navigate('/movies');
    } catch (err) {
      console.log(err);
      setRegisterStatus(REGISTER_ERROR);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const user = await autorize(email, password);
      localStorage.setItem('token', user.token);
      setCurrentUser(user.data);
      setLoggedIn(true);
      getCollection();
      navigate('/movies');
    } catch (err) {
      console.log(err);
      setLoginStatus(LOGIN_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const likeMovie = async (card) => {
    try {
      const movie = await addMovie(card);
      setMoviesCollection([...moviesCollection, movie.data]);
      localStorage.setItem('collection', JSON.stringify([...moviesCollection, movie.data]));
      setCollectionIds([...moviesCollection, movie.data].map((item) => ({ numId: item.movieId, hexId: item._id })));
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeMovie = async (cardId) => {
    try {
      const hexId = collectionIds.filter((item) => (item.numId === cardId))[0].hexId;
      if (hexId) {
        await removeMovie(hexId);
      }
      const copy = [...moviesCollection];
      const newCollection = copy.filter((item) => (item.movieId !== cardId));
      setMoviesCollection(newCollection);
      setCollectionIds(newCollection.map((item) => ({ numId: item.movieId, hexId: item._id })));
    } catch (err) {
      console.log(err);
    }
  };

  const handeProfileChange = async (name, email) => {
    setLoading(true);
    try {
      const user = await updateUser(name, email);
      setCurrentUser(user.data);
      setLoggedIn(true);
      setUpdateUserStatus(UPDATE_USER_SUCCESS);
    } catch (err) {
      setUpdateUserStatus(UPDATE_USER_ERROR);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogOut = () => {
    setLoading(true);
    setMovies([]);
    setMoviesCollection([]);
    setCollectionIds([]);
    setSearchText('');
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('collection');
    localStorage.removeItem('searchText');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('shortSavedMovies');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('savedSearchText');
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/');
    setLoading(false);
  };

  const checkIfLogin = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const user = await checkToken(token);
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user.data);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      checkIfLogin();
    }
  }, [loggedIn, checkIfLogin]);

  useEffect(() => {
    if (!!searchText) {
      getMoviesData();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setSavedSearchText('');
    if ((location.pathname === '/signin' || location.pathname === '/signup') && loggedIn) {
      navigate('/movies');
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Register onRegister={handleRegister} loading={loading} loggedIn={loggedIn} registerStatus={registerStatus}/>} />
        <Route path="/signin" element={<Login onLogin={handleLogin} loading={loading} loggedIn={loggedIn} loginStatus={loginStatus}/>} />
        <Route path="/" element={
          <CurrentUserContext.Provider value={{ currentUser }}>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <Header
              routein="/signin"
              linkexit="Войти"
              routeup="/signup"
              linkregister="Регистрация"
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
              loggedIn={loggedIn}
            />
            <Main />
            <Footer />
          </CurrentUserContext.Provider>
        }
        />
        <Route path="/movies" element={
          <CurrentUserContext.Provider value={{ currentUser }}>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn={loggedIn} />
            <ProtectedRoute
              Component={Movies}
              shortMovies={shortMovies}
              setShortMovies={setShortMovies}
              movies={movies}
              loggedIn={loggedIn}
              likeMovie={likeMovie}
              dislikeMovie={dislikeMovie}
              collectionIds={collectionIds}
              searchText={searchText}
              setSearchText={setSearchText}
              loading={loading}
              setLoading={setLoading}
              onSearchSubmit={onSearchSubmit}
            />
            <Footer />
          </CurrentUserContext.Provider>
          }
          />
        <Route path="/saved-movies" element={
          <CurrentUserContext.Provider value={{ currentUser }}>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn={loggedIn}/>
            <ProtectedRoute
              Component={SavedMovies}
              movies={moviesCollection}
              shortMovies={shortSavedMovies}
              setShortMovies={setShortSavedMovies}
              loggedIn={loggedIn}
              likeMovie={likeMovie}
              dislikeMovie={dislikeMovie}
              collectionIds={collectionIds}
              searchText={savedSearchText}
              setSearchText={setSavedSearchText}
              loading={loading}
              setLoading={setLoading}
              savedPage
            />
            <Footer />
          </CurrentUserContext.Provider>
          }
        />
        <Route path="/profile" element={
          <CurrentUserContext.Provider value={{ currentUser }}>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn={loggedIn} route/>
            <ProtectedRoute
              Component={Profile}
              loggedIn={loggedIn}
              onLogOut={handleLogOut}
            />
          </CurrentUserContext.Provider>
          }
        />
        <Route path="/edit" element={
          <CurrentUserContext.Provider value={{ currentUser }}>
            <Popup showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
            <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} loggedIn={loggedIn} route/>
            <ProtectedRoute
              Component={ProfileEdit}
              loggedIn={loggedIn}
              onEdit={handeProfileChange}
              updateUserStatus={updateUserStatus}
              loading={loading}
            />
          </CurrentUserContext.Provider>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}


export default App;
