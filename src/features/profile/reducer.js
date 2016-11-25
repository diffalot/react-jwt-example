/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_PROFILE,
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_END,
  FETCH_PROFILE_ERROR,
} from './constants'

// The initial application state
let initialState = {
  fetchingProfile: false
}

// Takes care of changing the application state
function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
     return Object.assign({}, state, {
       fetchingProfile: true
     })
    case FETCH_PROFILE_BEGIN:
     return Object.assign({}, state, {
       fetchingProfile: true
     })
    case FETCH_PROFILE_END:
      console.log({action})
      return Object.assign({}, state, action.payload, {
        fetchingProfile: false
      })
    case FETCH_PROFILE_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        fetchingProfile: false
      })
    default:
      return state
  }
}

export default reducer
