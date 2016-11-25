import reducer from './reducer'
import {
  FETCH_PROFILE,
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_END,
  FETCH_PROFILE_ERROR
} from './constants'

describe('profile reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        fetchingProfile: false
      }
    )
  })
  it('should handle FETCH_PROFILE', () => {
    expect(
      reducer(undefined, { type: FETCH_PROFILE })
    ).toEqual(
      {
        fetchingProfile: true
      }
    )
  })
  it('should handle FETCH_PROFILE_BEGIN', () => {
    expect(
      reducer(undefined, { type: FETCH_PROFILE_BEGIN })
    ).toEqual(
      {
        fetchingProfile: true
      }
    )
  })
  it('should handle FETCH_PROFILE_END', () => {
    expect(
      reducer(undefined, { type: FETCH_PROFILE_END, payload: {id: 'uuid'} })
    ).toEqual(
      {
        fetchingProfile: false,
        id: 'uuid'
      }
    )
  })
  it('should handle FETCH_PROFILE_ERROR', () => {
    expect(
      reducer(undefined, { type: FETCH_PROFILE_ERROR, payload: {message: 'error'} })
    ).toEqual(
      {
        fetchingProfile: false,
        error: {
          message: 'error'
        }
      }
    )
  })
})
