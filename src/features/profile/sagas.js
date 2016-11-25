import { takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

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

function * fetchProfile () {
  yield put({type: FETCH_PROFILE_BEGIN})
  try {
    const profile = yield fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then(function (response) {
        return response.json()
      })
    yield put({type: FETCH_PROFILE_END, payload: profile})
  } catch (error) {
    put({type: FETCH_PROFILE_ERROR, payload: error})
  }
}

// Watcher Sagas

function * fetchProfileWatcher () {
  yield * takeLatest(FETCH_PROFILE, fetchProfile)
}

export default fetchProfileWatcher
