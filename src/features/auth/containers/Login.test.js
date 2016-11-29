import React       from 'react'
import { shallow } from 'enzyme'

import { Login   } from './Login'

it('renders without crashing', () => {
  let state = {
    auth: {
      formState: {
        email: '',
        password: ''
      },
      error: {}
    }
  }
  shallow(<Login state={state} />)
})
