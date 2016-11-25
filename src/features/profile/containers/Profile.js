import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import { loadProfile } from '../actions'

class Dashboard extends Component {
  componentDidMount () {
    this.props.dispatch(loadProfile())
  }
  render () {
    return (
      <article>
        <section className='text-section'>
          <h1>Dashboard</h1>
          <pre>{JSON.stringify(this.props.profile, null, 4)}</pre>
        </section>
      </article>
    )
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object
}

function select (state) {
  return {
    profile: state.profile
  }
}

export default connect(select)(Dashboard)
