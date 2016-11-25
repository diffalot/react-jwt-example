import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

import {registerRequest} from '../actions'

export class Register extends Component {
  constructor (props) {
    super(props)

    this._register = this._register.bind(this)
  }

  render () {
    let {dispatch} = this.props
    let {formState, currentlySending, error} = this.props.data

    return (
      <LoginForm data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._register} btnText={'Register'} error={error} currentlySending={currentlySending} />
    )
  }

  _register (email, password) {
    this.props.dispatch(registerRequest({email, password}))
  }
}

Register.propTypes = {
  data: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

function select (state) {
  return {
    data: state.auth
  }
}

export default connect(select)(Register)
