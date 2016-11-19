import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from '../utils/AuthService'
import Container from './Container'
import Landing from './landing/Landing.js'
import Parent from './parent/Parent.js'
import Login from './login/Login.js'

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/landing" />
      <Route path="landing" component={Landing} />
      <Route path="login" component={Login} />
      <Route path="parent" component={Parent} onEnter={requireAuth} />
    </Route>
  )
}

export default makeMainRoutes
