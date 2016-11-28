import * as constants from './constants'

import reducer, { initialState } from './reducer'

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })
  it('should handle FORM_CHANGE', () => {
    let payload = {
      email: 'email@example.com',
      password: 'passme'
    }
    let expected = Object.assign({}, initialState, {authInputs: payload})
    expect(
      reducer(undefined, { type: constants.FORM_CHANGE, payload: payload })
    ).toEqual(expected)
  })
  it('should handle SET to true', () => {
    let expected = Object.assign({}, initialState, {loggedIn: true})
    expect(
      reducer(undefined, { type: constants.SET, payload: true })
    ).toEqual(expected)
  })
  it('should handle SET to false', () => {
    let expected = Object.assign({}, initialState, {loggedIn: false})
    expect(
      reducer(undefined, { type: constants.SET, payload: false })
    ).toEqual(expected)
  })
  it('should handle ERROR object', () => {
    let payload = {
      type: 'SERVER',
      message: 'could not connect'
    }
    let expected = Object.assign({}, initialState, {error: payload})
    expect(
      reducer(undefined, { type: constants.ERROR, payload })
    ).toEqual(expected)
  })
  it('should handle SENDING as true', () => {
    let expected = Object.assign({}, initialState, {sending: true})
    expect(
      reducer(undefined, { type: constants.SENDING, payload: true })
    ).toEqual(expected)
  })
  it('should handle SENDING as false', () => {
    let expected = Object.assign({}, initialState, {sending: false})
    expect(
      reducer(undefined, { type: constants.SENDING, payload: false })
    ).toEqual(expected)
  })
})
