import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'

import reducers from './reducers'
const logger = createLogger()

let store = createStore(reducers, applyMiddleware(thunk, logger))

import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
