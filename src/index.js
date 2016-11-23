import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'

import './index.css';

import * as reducers from './reducers'
import { App, Home, Foo, Login } from './components'

import rootSaga from './sagas'

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

sagaMiddleware.run(rootSaga)

const history = syncHistoryWithStore(baseHistory, store)

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="login" component={Login}/>
          <Route path="foo" component={UserIsAuthenticated(Foo)}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
