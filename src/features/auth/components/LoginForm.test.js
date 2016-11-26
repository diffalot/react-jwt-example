import React from 'react'
import ReactDOM from 'react-dom'

import { LoginForm } from './LoginForm'

it('renders without crashing', () => {
  let state = {
    email: '',
    password: ''
  }
  const div = document.createElement('div')
  ReactDOM.render(<LoginForm state={state} />, div)
})
