const API_BASE_URL = 'http://localhost:3176/api';

function apiFetch(endpoint) {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
    },
  }).then(data => data.json());
}

export function config() {
  return apiFetch('/config');
}

export function getPopular() {
  return apiFetch('/getPopular');
}

export function getDetail(id) {
  return apiFetch(`/movies/${ id }`);
} 

export function searchByTitle(query) {
  return apiFetch(`/searchByTitle?query=${ query }`);
}
