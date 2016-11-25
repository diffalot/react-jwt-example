import React from 'react'
import { shallow } from 'enzyme'
import { Login } from './Login'

it('renders without crashing', () => {
  let state = {
    auth: {
      formState: {
        email: '',
        password: ''
      }
    }
  }
  shallow(<Login state={state} />)
})
