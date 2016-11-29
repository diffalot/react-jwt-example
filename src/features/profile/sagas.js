import { takeLatest                 } from 'redux-saga'
import { put                        } from 'redux-saga/effects'

import * as constants                 from './constants'
import { fetchProfile as getProfile } from './services'

// Worker Sagas

export function * fetchProfile () {
  yield put({type: constants.FETCH_PROFILE_BEGIN})
  try {
    const profile = yield getProfile()
    yield put({type: constants.FETCH_PROFILE_END, payload: profile})
  } catch (error) {
    put({type: constants.FETCH_PROFILE_ERROR, payload: error})
  }
}

// Watcher Sagas

export function * fetchProfileWatcher () {
  yield * takeLatest(constants.FETCH_PROFILE, fetchProfile)
}

export default fetchProfileWatcher
