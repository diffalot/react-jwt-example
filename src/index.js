import ReactDOM                    from 'react-dom'
import React, { Component        } from 'react'
import        { createStore,
                combineReducers,
                applyMiddleware  } from 'redux'
import        { Provider         } from 'react-redux'
import        { Router,
                Route,
                browserHistory   } from 'react-router'
import        { routerReducer,
                syncHistoryWithStore,
                routerMiddleware } from 'react-router-redux'
import createSagaMiddleware        from 'redux-saga'
import createLogger                from 'redux-logger'

import reducers                    from './reducers'

let logger = createLogger({
  // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
  predicate: (getState, action) => action.type !== 'CHANGE_FORM'
})

let sagaMiddleware = createSagaMiddleware()

const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))

const store = createStore(reducer,
  applyMiddleware(
    routingMiddleware,
    sagaMiddleware,
    logger
  )
)

import runSagas from './sagas'

runSagas(sagaMiddleware)

const history = syncHistoryWithStore(baseHistory, store)

import App from './containers/App'
import Home from './components/Home'
import Login from './features/auth/containers/Login'
import Register from './features/auth/containers/Register'
import Profile from './features/profile/containers/Profile'
import NotFound from './components/NotFound'

function checkAuth (nextState, replace) {
  let { loggedIn } = store.getState().auth

  // Check if the path isn't dashboard. That way we can apply specific logic to
  // display/render the path we want to
  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/dashboard')
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/dashboard')
      }
    }
  }
}

// Mostly boilerplate, except for the routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
class ReactJwtExample extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route path='/' component={Home} />
            <Route onEnter={checkAuth}>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={Profile} />
            </Route>
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<ReactJwtExample />, document.getElementById('root'))
