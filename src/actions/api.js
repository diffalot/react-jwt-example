/*
 * Actions describe changes of state in your application
 */

// We import constants to name our actions' type
import {
  API_REQUEST
} from '../constants'

export function post (endpoint, data) {
  return {type: API_REQUEST, endpoint, data, method: 'POST'}
}

export function get (endpoint, data) {
  return {type: API_REQUEST, endpoint, data, method: 'GET'}
}

export function getProfile () {
  return {
    type: API_REQUEST,
    endpoint: '/api/me',
    method: 'GET'
  }
}
