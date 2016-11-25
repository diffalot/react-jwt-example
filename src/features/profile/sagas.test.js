import { put, take } from 'redux-saga/effects'

import {
  FETCH_PROFILE,
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_END,
  FETCH_PROFILE_ERROR
  // TODO: REQUEST_JWT_TOKEN
} from './constants'

import { loadProfile, loadProfileWatcher } from './sagas'
import { loadProfile as fetchProfile } from './actions'

describe('profile watcher saga', () => {
  it('should watch for FETCH_PROFILE', () => {
    const expected = take(FETCH_PROFILE, loadProfile)
    const generator = loadProfileWatcher()
    let next = generator.next()
    expect(next.value).toEqual(expected)
  })
})

describe('profile worker saga', () => {
  it('should handle FETCH_PROFILE', () => {
    const expected = put({type: FETCH_PROFILE_BEGIN})
    const generator = loadProfile()
    let next = generator.next(fetchProfile())
    expect(next.value).toEqual(expected)
  })
})
