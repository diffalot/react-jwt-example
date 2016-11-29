import fetch from 'isomorphic-fetch'

const API_URL = 'http://localhost:3000'

let localStorage

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}

const api = {
  post (endpoint, data) {
    return fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json()
      })
  }
}

export const auth = {
  login (email, password) {
    if (auth.loggedIn()) return Promise.resolve(true)

    return api.post('/auth/login', {email, password})
      .then(response => {
        localStorage.token = response.token
        return Promise.resolve(true)
      })
  },

  logout () {
    // return api.post('/logout')
    return new Promise(resolve => {
      localStorage.removeItem('token')
      resolve(true)
    })
  },

  loggedIn () {
    return !!localStorage.token
  },

  register (email, password) {
    return api.post('/auth/signup', { email, password })
      .then(() => auth.login(email, password))
  },
  onChange () {}
}

export default auth
