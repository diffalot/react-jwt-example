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
  /**
  * Pretends to post to a remote server
  * @param  {string}  endpoint The endpoint of the server that should be contacted
  * @param  {?object} data     The data that should be transferred to the server
  */
  post ({endpoint, data}) {
    return fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json()
    })
  },
  get ({endpoint, data}) {
    return fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      method: 'GET',
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json()
    })

  }
}

// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

// import {hashSync} from 'bcryptjs'
// import genSalt from '../auth/salt'
import {take, call, put, fork} from 'redux-saga/effects'

import {
  API_REQUEST,
  CALLING_API,
  RECEIVE_API,
  API_ERROR
} from './constants'

export function * callApi ({endpoint, data, method}) {
  yield put({type: CALLING_API, sending: true})

  let response

  switch (method) {
    case 'POST':
      response = yield api.post({endpoint, data})
      return response
    default:
      response = yield api.get({endpoint, data})
      return response
  }
}

/**
 * Log in saga
 */
export function * apiFlow () {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    let request = yield take(API_REQUEST)
    let {endpoint, data, method} = request

    try {
      let response = yield call(callApi, {endpoint, data, method})
      yield put({type: RECEIVE_API, data: response})

    } catch (error) {
      yield put({type: CALLING_API, sending: false})
      yield put({type: API_ERROR, error: error})
    }
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * root () {
  yield fork(apiFlow)
}
