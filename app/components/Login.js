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
      <form>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" placeholder="Name"/>
        </FormGroup>

        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" placeholder="Password"/>
        </FormGroup>

        <FormGroup>
          <Checkbox>Remember me</Checkbox>

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