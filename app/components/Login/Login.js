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

  // const handleSubmit = (evt) => {
  //   console.log("submit form")
  //   props.login({ email: props.email, password: props.password, }).then(user => {
  //     if (user !== null) {
  //       console.log(user.username)
  //       browserHistory.push("/");
  //     } else {
  //       console.log("Login failed")
  //     }
  //   })
  // }

  return (
    <div style={center}>
      <form onSubmit={props.submitForm}>
        <FormGroup controlId="formValidationSuccess1" validationState="success">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            value={props.email}
            onChange={props.onEmailChange}
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