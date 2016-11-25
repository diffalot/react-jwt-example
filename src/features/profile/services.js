import fetch from 'isomorphic-fetch'

const API_URL = process.env.REACT_APP_API_URL

// TODO: find out if this block is really needed
// If we're testing, use a local storage polyfill
// If not, use the browser one
let localStorage
if (process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  localStorage = global.window.localStorage
}

export function fetchProfile () {
  return fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  })
    .then(function (response) {
      return response.json()
    })
}
