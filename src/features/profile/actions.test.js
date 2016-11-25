import { loadProfile } from './actions'
import { FETCH_PROFILE } from './constants'

describe('actions()', () => {
  it('should create a load profile action', () => {
    const expected = { type: FETCH_PROFILE }
    expect(loadProfile()).toEqual(expected)
  })
})
