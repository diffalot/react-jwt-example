import React from 'react'
import { shallow } from 'enzyme'
import { Register } from './Register'

it('renders without crashing', () => {
  let state = {
    auth: {
      formState: {
        email: '',
        password: ''
      }
    }
  }
  shallow(<Register state={state}/>)
})
