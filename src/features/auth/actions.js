import * as constants from './constants'

// expect payload of { email, password }
export function register (payload) {
  return { type: constants.REGISTER, payload }
}

// expect payload of { email, password }
export function login (payload) {
  return { type: constants.LOGIN, payload }
}

// payload is either true or false
export function set (payload) {
  return { type: constants.SET, payload }
}

// payload is a error object with optional message and type attributes
export function error (payload) {
  return { type: constants.ERROR, payload }
}

export function logout () {
  return { type: constants.LOGOUT }
}

// payload is true or false
export function sending (payload) {
  return { type: constants.SENDING, payload }
}

// expects a payload of {email, password}
export function inputChange (payload) {
  return { type: constants.FORM_CHANGE, payload }
}
