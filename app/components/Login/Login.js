import React from "react";
import { FormGroup, FormControl, Button, Checkbox, ControlLabel } from "react-bootstrap";

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
        <div>
          <FormGroup controlId="formValidationSuccess1" validationState="success">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={props.email}
              onChange={props.onEmailChange}
              type="text"
              placeholder="email"/>
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
        </div>



        <FormGroup>
          <Button type="submit">
            Sign in
          </Button>
        </FormGroup>
      </ form >
    </div>

  )

}