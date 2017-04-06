import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router'

var LoginButtons = function () {
  var style = {
    float: "right"
  }
  return (
    <div style={style}>
      <Link to="/login">
        <Button bsStyle="primary">Login</Button>
      </Link>
      <Link to="/register">
        <Button bsStyle="primary">Register</Button>
      </Link>

    </div>

  )
}

module.exports = LoginButtons;
