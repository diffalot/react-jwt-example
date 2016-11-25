import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

import {loginRequest} from '../actions'

class Login extends Component {
  constructor (props) {
    super(props)

    this._login = this._login.bind(this)
  }

  render () {
    let {dispatch} = this.props
    let {formState, currentlySending, error} = this.props.data

    return (
        <LoginForm data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._login} btnText={'Login'} error={error} currentlySending={currentlySending} />
    )
  }

  _login (email, password) {
    this.props.dispatch(loginRequest({email, password}))
  }
}

Login.propTypes = {
  data: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state.auth
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login)
