import React, { PropTypes } from "react";
import {FormGroup, Button } from "react-bootstrap";
import FieldGroup from '../generic/FieldGroup';


export default function Register(props) {
  var center = {
    top: '50%',
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px',
  }
  return (
    <div style={center}>
      <form onSubmit={props.submitForm}>
        <FieldGroup
          id="formValidationSuccess1"
          label="Email"
          value={props.email}
          onChange={props.onEmailChange}
          type="email"
          placeholder="email"
        />
        <FieldGroup
          id="formValidationSuccess1"
          label="Username"
          value={props.username}
          onChange={props.onUsernameChange}
          type="text"
          placeholder="username"
        />

        <FieldGroup
          id="formValidationSuccess1"
          label="Password"
          value={props.password}
          onChange={props.onPasswordChange}
          type="password"
          placeholder="password"
        />

        <FormGroup>
          <Button type="submit">
            Register
          </Button>
        </FormGroup>
      </ form >
    </div>
  )


}
Register.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
}