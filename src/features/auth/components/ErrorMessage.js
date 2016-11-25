import React from 'react'

function ErrorMessage (props) {
  return (
    <p>
      {props.error}
    </p>
  )
}

ErrorMessage.propTypes = {
  error: React.PropTypes.string
}

export default ErrorMessage
