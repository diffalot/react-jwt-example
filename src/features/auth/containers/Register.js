import React, {Component} from 'react'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm'
import { register } from '../actions'

export class Register extends Component {
  constructor (props) {
    super(props)

    this._register = this._register.bind(this)
  }

  render () {
    let { dispatch } = this.props
    let { authInputs, sending, error } = this.props.state

    return (
      <LoginForm
        state={authInputs}
        dispatch={dispatch}
        history={this.props.history}
        onSubmit={this._register}
        btnText={'Register'}
        error={error}
        sending={sending}
      />
    )
  }

  _register (email, password) {
    this.props.dispatch(register({email, password}))
  }
}

Register.propTypes = {
  state: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

function select (state) {
  return {
    state: state.auth
  }
}

export default connect(select)(Register)
