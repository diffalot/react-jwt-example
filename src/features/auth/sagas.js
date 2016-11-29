import { take, call, put, fork, race } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import auth from './services'

import * as constants from './constants'
import * as actions from './actions'

// worker sagas

export function * login ({ email, password, isRegistering }) {
  yield put(actions.sending(true))

  try {
    let response

    if (isRegistering) {
      response = yield call(auth.register, email, password)
    } else {
      response = yield call(auth.login, email, password)
    }

    return response
  } catch (error) {
    yield put(actions.error(error))
    return false
  } finally {
    yield put(actions.sending(false))
  }
}

export function * logout () {
  yield put(actions.sending(true))

  try {
    let response = yield call(auth.logout)
    yield put(actions.sending(false))

    return response
  } catch (error) {
    yield put(actions.error(error))
  }
}

// watcher sagas

export function * watchLogin () {
  while (true) {
    let request = yield take(constants.LOGIN)
    let { email, password } = request.payload

    let winner = yield race({
      login: call(login, { email, password, isRegistering: false }),
      logout: take(constants.LOGOUT)
    })

    if (winner.login) {
      yield put(actions.set(true))
      yield put(actions.inputChange({email: '', password: ''}))
      forwardTo('/dashboard')
    } else if (winner.logout) {
      yield call(logout)
      forwardTo('/')
    }
  }
}

export function * watchLogout () {
  while (true) {
    yield take(constants.LOGOUT)
    yield put(actions.set(false))

    yield call(logout)
    forwardTo('/')
  }
}

export function * watchRegister () {
  while (true) {
    let request = yield take(constants.REGISTER)
    let {email, password} = request.data

    let wasSuccessful = yield call(login, {email, password, isRegistering: true})

    if (wasSuccessful) {
      yield put(actions.set(true))
      yield put(actions.inputChange({email: '', password: ''}))
      forwardTo('/dashboard') // Go to dashboard page
    }
  }
}

export default function * root () {
  yield fork(watchLogin)
  yield fork(watchLogout)
  yield fork(watchRegister)
}

// Little helper function to abstract going to different pages
function forwardTo (location) {
  browserHistory.push(location)
}
