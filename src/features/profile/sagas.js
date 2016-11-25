import { takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'

import {
  FETCH_PROFILE,
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_END,
  FETCH_PROFILE_ERROR
  // TODO: REQUEST_JWT_TOKEN
} from './constants'

import { fetchProfile as getProfile } from './services'

// Worker Sagas

export function * fetchProfile () {
  yield put({type: FETCH_PROFILE_BEGIN})
  try {
    const profile = yield getProfile()
    yield put({type: FETCH_PROFILE_END, payload: profile})
  } catch (error) {
    put({type: FETCH_PROFILE_ERROR, payload: error})
  }
}

// Watcher Sagas

export function * fetchProfileWatcher () {
  yield * takeLatest(FETCH_PROFILE, fetchProfile)
}

export default fetchProfileWatcher
