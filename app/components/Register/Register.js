import React, { PropTypes } from "react";
import {FormGroup, FormControl, Button, ControlLabel} from "react-bootstrap";


export default function Register(props) {
  var center = {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px'
  }

  return (
    <div style={center}>
      <form onSubmit={props.submitForm}>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            value={props.username}
            onChange={props.onUsernameChange}
            type="text"
            placeholder="Name"/>
        </FormGroup>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            value={props.email}
            onChange={props.onEmailChange}
            type="email"
            placeholder="email"/>
        </FormGroup>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={props.password}
            onChange={props.onPasswordChange}
            type="password"
            placeholder="Password"/>
        </FormGroup>

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