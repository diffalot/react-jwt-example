import React, { Component, PropTypes } from 'react';
import AuthService from '../../utils/AuthService'
import './Login.css';

class Login extends Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2>Login Screen</h2>
        </div>
        <p className="App-intro">
        <button onClick={auth.login.bind(this)}>Login</button>
        </p>
      </div>
    );
  }
}

export default Login;
