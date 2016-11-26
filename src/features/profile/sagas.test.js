import { put, take } from 'redux-saga/effects'

import {
  FETCH_PROFILE,
  FETCH_PROFILE_BEGIN
  // FIXME: how do I test these?
  // FETCH_PROFILE_END,
  // FETCH_PROFILE_ERROR
} from './constants'

import { fetchProfile, fetchProfileWatcher } from './sagas'
import { fetchProfile as getProfile } from './actions'

describe('profile watcher saga', () => {
  it('should watch for FETCH_PROFILE', () => {
    const expected = take(FETCH_PROFILE, getProfile)
    const generator = fetchProfileWatcher()
    let next = generator.next()
    expect(next.value).toEqual(expected)
  })
})

describe('profile worker saga', () => {
  it('should handle FETCH_PROFILE', () => {
    const expected = put({type: FETCH_PROFILE_BEGIN})
    const generator = fetchProfile()
    let next = generator.next(fetchProfile())
    expect(next.value).toEqual(expected)
  })
})
