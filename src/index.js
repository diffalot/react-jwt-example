import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'

import reducers from './reducers'

let store = createStore(reducers, applyMiddleware(thunk, logger()))

import App from './App';
import './index.css';

import {browserHistory} from 'react-router'
import makeRoutes from './views'

const routes = makeRoutes()

ReactDOM.render(
  <Provider store={store}>
    <App history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
