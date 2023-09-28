import { API_URL } from "./constants";
import { getResponseData } from "./utils";

export const addMovie = async (data) => {
  const res = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      country: data.country,
      director: data.director,
      duration: `${data.duration}`,
      description: data.description,
      trailerLink: data.trailerLink,
      image: `https://api.nomoreparties.co${data.image.url}`,
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      year: data.year,
    }),
  });
  return getResponseData(res);
}

export const removeMovie = async (cardId) => {
  const request = await fetch(`${API_URL}/movies/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return getResponseData(request);
}

export const getSavedMovies = async () => {
  const res = await fetch(`${API_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return getResponseData(res);
}

export const register = async (name, email, password) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return getResponseData(res);
}

export const autorize = async (email, password) => {
  const res = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return getResponseData(res);
};

export const checkToken = async (token) => {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return getResponseData(res);
}

export const updateUser = async (name, email) => {
  const res = await fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ name, email }),
  });
  return getResponseData(res);
}
