import React from "react";
import {FormGroup, FormControl, Button, Checkbox, ControlLabel} from "react-bootstrap";

export default function Login(props) {
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
            placeholder="username"/>
        </FormGroup>

        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={props.password}
            onChange={props.onPasswordChange}
            type="password"
            placeholder="password"
          />
        </FormGroup>


        <FormGroup>
          <Button type="submit">
            Sign in
          </Button>
        </FormGroup>
      </ form >
    </div>

  )

}