import React, { Component  } from 'react'
import        { Link       } from 'react-router'

import        { logout,
                clearError } from '../features/auth/actions'

// FIXME: this seems like a long reach
import LoadingButton from '../features/auth/components/LoadingButton'

export class Nav extends Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render () {
    let navButtons = this.props.loggedIn ? (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              {this.props.currentlySending ? (
                <LoadingButton />
              ) : (
                <a href='#' onClick={this._logout}>Logout</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    ) : (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/register' onClick={this._clearError}>Register</Link>
            </li>
            <li>
              <Link to='/login' onClick={this._clearError}>Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    )

    return (
      <div>
        <div>
          <Link to='/' onClick={this._clearError}>
            <h1>React JWT Example</h1>
          </Link>
          {navButtons}
        </div>
      </div>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

export default Nav
