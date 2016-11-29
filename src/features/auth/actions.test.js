import * as actions   from './actions'
import * as constants from './constants'

describe('auth actions()', () => {
  it('should create a REGISTER action', () => {
    let payload = {
      email: '',
      password: ''
    }
    const expected = { type: constants.REGISTER, payload }
    expect(actions.register(payload)).toEqual(expected)
  })
  it('should create a LOGIN action', () => {
    let payload = {
      email: '',
      password: ''
    }
    const expected = { type: constants.LOGIN, payload }
    expect(actions.login(payload)).toEqual(expected)
  })
  it('should create a FORM_CHANGE action', () => {
    let payload = {
      email: '',
      password: ''
    }
    const expected = { type: constants.FORM_CHANGE, payload }
    expect(actions.inputChange(payload)).toEqual(expected)
  })
  it('should create a SET action', () => {
    const expected = { type: constants.SET, payload: true }
    expect(actions.set(true)).toEqual(expected)
  })
  it('should create a ERROR action', () => {
    let payload = {
      type: 'SERVER',
      message: 'could not connect'
    }
    const expected = { type: constants.ERROR, payload }
    expect(actions.error(payload)).toEqual(expected)
  })
  it('should create a LOGOUT action', () => {
    const expected = { type: constants.LOGOUT }
    expect(actions.logout()).toEqual(expected)
  })
  it('should create a SENDING action', () => {
    const expected = { type: constants.SENDING, payload: true }
    expect(actions.sending(true)).toEqual(expected)
  })
})
