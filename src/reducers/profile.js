/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  GET_PROFILE,
  PROFILE_RETREIVED,
  RECEIVE_API
} from '../constants'

// The initial application state
let initialState = {
  fetchingProfile: false,
  profile: {}
}

// Takes care of changing the application state
function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return Object.assign({}, state, {fetchingProfile: true})
    case PROFILE_RETREIVED:
      return Object.assign({}, state, {
        profile: action.data,
        fetchingProfile: false
      })
    case RECEIVE_API:
      return Object.assign({}, state, {
        profile: action.data,
        fetchingProfile: false
      })
    default:
      return state
  }
}

export default reducer
