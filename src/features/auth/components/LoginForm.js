import React, {Component} from 'react'
import ErrorMessage from './ErrorMessage'
import LoadingButton from './LoadingButton'

import { inputChange } from '../actions'

export class LoginForm extends Component {
  constructor (props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
    this._changeEmail = this._changeEmail.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }
  render () {
    let { error } = this.props

    return (
      <form onSubmit={this._onSubmit}>
        {error.message ? <ErrorMessage error={error.message} /> : null}
        <div>
          <input
            type='email'
            id='email'
            value={this.props.state.email}
            placeholder='email@example.com'
            onChange={this._changeEmail}
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false' />
          <label className='form__field-label' htmlFor='email'>
            Email
          </label>
        </div>
        <div>
          <input
            id='password'
            type='password'
            value={this.props.state.password}
            placeholder='••••••••••'
            onChange={this._changePassword} />
          <label htmlFor='password'>
            Password
          </label>
        </div>
        <div>
          {this.props.sending ? (
            <LoadingButton />
          ) : (
            <button>
              {this.props.btnText}
            </button>
          )}
        </div>
      </form>
    )
  }

  _changeEmail (event) {
    this._emitChange({...this.props.state, email: event.target.value})
  }

  _changePassword (event) {
    this._emitChange({...this.props.state, password: event.target.value})
  }

  _emitChange (newFormState) {
    this.props.dispatch(inputChange(newFormState))
  }

  _onSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.props.state.email, this.props.state.password)
  }
}

LoginForm.propTypes = {
  dispatch: React.PropTypes.func,
  state: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  changeForm: React.PropTypes.func,
  btnText: React.PropTypes.string,
  error: React.PropTypes.object,
  sending: React.PropTypes.bool
}

export default LoginForm
