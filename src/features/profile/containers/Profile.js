import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchProfile } from '../actions'

export class Profile extends Component {
  componentDidMount () {
    this.props.dispatch(fetchProfile())
  }
  render () {
    return (
      <article>
        <pre>{JSON.stringify(this.props.profile, null, 4)}</pre>
      </article>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  dispatch: PropTypes.func
}

function select (state) {
  return {
    profile: state.profile
  }
}

export default connect(select)(Profile)
