import React from 'react'
import { shallow } from 'enzyme'

import { Register } from './Register'

it('renders without crashing', () => {
  // TODO: should this run a reducer to generate state?
  let state = {
    auth: {
      formState: {
        email: '',
        password: ''
      }
    }
  }
  shallow(<Register state={state} />)
})
