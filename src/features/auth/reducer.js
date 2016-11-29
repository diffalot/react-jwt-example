import * as constants from './constants'
import auth           from './services'

export const initialState = {
  authInputs: {
    email: '',
    password: ''
  },
  error: {},
  sending: false,
  loggedIn: auth.loggedIn()
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.SET:
      return Object.assign({}, state, {loggedIn: action.payload})
    case constants.ERROR:
      return Object.assign({}, state, {error: action.payload})
    case constants.SENDING:
      return Object.assign({}, state, {sending: action.payload})
    case constants.FORM_CHANGE:
      return Object.assign({}, state, {authInputs: action.payload})
    default:
      return state
  }
}

export default reducer
