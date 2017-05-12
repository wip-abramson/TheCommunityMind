import React from "react";
import {FormGroup, FormControl, Button, Checkbox, ControlLabel} from "react-bootstrap";


export default React.createClass({
  center : {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px'
  },

  getInitialState () {
    return {
      username: '',
      password: '',
      email: '',
    }
  },

  handleUsernameChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      {username: event.target.value}
    ))
  },
  handlePasswordChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      {password: event.target.value}
    ))
  },
  handleEmailChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      {email: event.target.value}
    ))
  },

  submitForm () {
    console.log("Form", this.state.username, this.state.password, this.state.email)
    this.props.addUser({variables: {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    }})
  },

  render() {
    return (
      <div style={this.props.center}>
        <form onSubmit={this.submitForm}>
          <FormGroup controlId="formValidationSuccess1" validationState="success">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              value={this.state.username}
              onChange={this.handleUsernameChange}
              type="text"
              placeholder="Name"/>
          </FormGroup>
          <FormGroup controlId="formValidationSuccess1" validationState="success">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleEmailChange}
              type="email"
              placeholder="email"/>
          </FormGroup>
          <FormGroup controlId="formValidationSuccess1" validationState="success">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type="password"
              placeholder="Password"/>
          </FormGroup>
          {/*<FormGroup controlId="formValidationSuccess1" validationState="success">*/}
          {/*<ControlLabel>Password</ControlLabel>*/}
          {/*<FormControl type="password" placeholder="Password"/>*/}
          {/*</FormGroup>*/}


          <FormGroup>
            <Button type="submit">
              Register
            </Button>
          </FormGroup>
        </ form >
      </div>
    )
  }

})