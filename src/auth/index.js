import api from './api'

let localStorage

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}

let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} email The email of the user
  * @param  {string} password The password of the user
  */
  login (email, password) {
    if (auth.loggedIn()) return Promise.resolve(true)

    // Post a fake request
    return api.post('/auth/login', {email, password})
      .then(response => {
        // Save token to local storage
        localStorage.token = response.token
        return Promise.resolve(true)
      })
  },
  /**
  * Logs the current user out
  */
  logout () {
    // return api.post('/logout')
    return new Promise(resolve => {
      localStorage.removeItem('token')
      resolve(true)
    })
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn () {
    return !!localStorage.token
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register (email, password) {
    // Post a fake request
    return api.post('/auth/signup', {email, password})
      // Log user in after registering
      .then(() => auth.login(email, password))
  },
  onChange () {}
}

export default auth
