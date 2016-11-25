import React, {Component} from 'react'
import ErrorMessage from './ErrorMessage'
import LoadingButton from './LoadingButton'

import {changeForm} from '../actions'

class Form extends Component {
  constructor (props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
    this._changeEmail = this._changeEmail.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }
  render () {
    let {error} = this.props

    return (
      <form className='form' onSubmit={this._onSubmit}>
        {error ? <ErrorMessage error={error} /> : null}
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            type='email'
            id='email'
            value={this.props.data.email}
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
            className='form__field-input'
            id='password'
            type='password'
            value={this.props.data.password}
            placeholder='••••••••••'
            onChange={this._changePassword} />
          <label htmlFor='password'>
            Password
          </label>
        </div>
        <div>
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className='form__submit-btn' type='submit'>
              {this.props.btnText}
            </button>
          )}
        </div>
      </form>
    )
  }

  _changeEmail (event) {
    this._emitChange({...this.props.data, email: event.target.value})
  }

  _changePassword (event) {
    this._emitChange({...this.props.data, password: event.target.value})
  }

  _emitChange (newFormState) {
    this.props.dispatch(changeForm(newFormState))
  }

  _onSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.props.data.email, this.props.data.password)
  }
}

Form.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  changeForm: React.PropTypes.func,
  btnText: React.PropTypes.string,
  error: React.PropTypes.string,
  currentlySending: React.PropTypes.bool
}

export default Form
