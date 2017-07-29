/**
 * Created by will on 28/07/17.
 */
import React from 'react';

function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0 || email.indexOf('@') == -1,
    password: password.length === 0,
  };
}

class Authentication extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',

      touched: {
        email: false,
        password: false,
      },
    };
  }

  formStyle = {
    top: '50%',
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px',
  }

  inputStyle = {
    display: 'block',
    width: '100%',
    fontSize: 20,
    padding: '5px 10px',
    margin: '10px 0',
    borderRadius: 5,
    border: '1px solid #ddd'
  }

  error = {
    borderColor: 'red'
  }

  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  handleUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (!this.canBeSubmitted()) {

      return;
    }
    const { email, password, username } = this.state;
    this.props.authenticate(email, password, username)
    // alert(`Signed up with email: ${email} password: ${password}`);
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <form onSubmit={this.handleSubmit} style={this.formStyle}>
        <input
          style={shouldMarkError('email') ? { ...this.error, ...this.inputStyle } : this.inputStyle}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onBlur={this.handleBlur('email')}
        />
        {this.props.isRegister ?
          <input
            style={shouldMarkError('username') ? { ...this.error, ...this.inputStyle } : this.inputStyle}
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          /> : null}
        <input
          style={shouldMarkError('password') ? { ...this.error, ...this.inputStyle } : this.inputStyle}
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onBlur={this.handleBlur('password')}
        />

        <button disabled={isDisabled}>{this.props.submitLabel}</button>
      </form>
    )
  }
}

export default Authentication;