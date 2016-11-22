import { combineReducers } from 'redux'

import {authStateReducer} from "redux-auth";

const count = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
export default combineReducers({
  count,
  auth: authStateReducer
})
