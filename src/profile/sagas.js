import fetch from 'isomorphic-fetch'
import {take, call, put, fork} from 'redux-saga/effects'

import {
  FETCH_PROFILE,
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_END,
  FETCH_PROFILE_ERROR
  // TODO: REQUEST_JWT_TOKEN
} from './constants'

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

// Worker Sagas

export function * fetchProfile () {
  yield put({type: FETCH_PROFILE_BEGIN, sending: true})
  let payload = yield fetch(`${API_URL}/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    method: 'GET'
  })
    .then(function (response) {
      return response.json()
    })
    .catch(function (error) {
      // if this is a jwt token error, we should request one
      put({type: FETCH_PROFILE_ERROR, payload: error})
    })
  yield put({type: FETCH_PROFILE_END, payload: payload})
}

// Watcher Sagas

export function * fetchProfileWatcher () {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    yield take(FETCH_PROFILE)
    yield call(fetchProfile)
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * root () {
  yield fork(fetchProfileWatcher)
}
