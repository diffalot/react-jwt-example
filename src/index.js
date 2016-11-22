import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk";
import createLogger from 'redux-logger'
import { configure } from 'redux-auth'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import reducers from './reducers.js'
const logger = createLogger();

let store = createStore(reducers, applyMiddleware(thunk, logger))

window.store = store

store.dispatch(configure([
  {
    default: {
      apiUrl: 'http://localhost:3000',
      emailSignInPath: '/auth/login'
    }
  }
]))

import App from './App';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
