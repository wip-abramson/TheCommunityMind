import React from "react";
import {FormGroup, FormControl, Button, Checkbox, ControlLabel} from "react-bootstrap";


export default function Register() {
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
          <ControlLabel>Username</ControlLabel>
          <FormControl type="text" placeholder="Name"/>
        </FormGroup>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" placeholder="email"/>
        </FormGroup>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" placeholder="Password"/>
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
            Register
          </Button>
        </FormGroup>
      </ form >
    </div>
  )
}