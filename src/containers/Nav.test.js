import React       from 'react'
import { shallow } from 'enzyme'

import { Nav     } from './Nav'

it('renders without crashing', () => {
  // FIXME: Do I need a reducer in a test for a container?
  shallow(<Nav loggedIn currentlySending={false} dispatch={jest.fn()} />)
})
