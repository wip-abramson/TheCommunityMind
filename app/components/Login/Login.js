import React from "react";
import { FormGroup, Button } from "react-bootstrap";
import FieldGroup from '../generic/FieldGroup';

export default function Login(props) {
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
        <div>
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
            label="Password"
            value={props.password}
            onChange={props.onPasswordChange}
            type="password"
            placeholder="password"
          />

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