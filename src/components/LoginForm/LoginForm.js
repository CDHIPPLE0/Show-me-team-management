import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <center className="form">
        <form onSubmit={this.login}>
          <br />
          <h2>Login</h2>
          {this.props.store.errors.loginMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.loginMessage}
            </h3>
          )}
          <div>
            <label htmlFor="username">
              <TextField
                autoComplete="off"
                label="username"
                type="text"
                name="username"
                required
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <TextField
                autoComplete="off"
                label="password"
                type="password"
                name="password"
                required
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <br />
          <div>
            <Button
              style={{
                backgroundColor: '#77818c',
              }}
              variant="contained"
              type="submit"
              name="submit"
              value="Log In"
            >
              Login
            </Button>
          </div>
        </form>
        <>
          <Button
            style={{
              backgroundColor: '#77818c',
            }}
            variant="contained"
            type="button"
            className="btn btn_asLink"
            onClick={this.props.callback}
          >
            Register
          </Button>
        </>
      </center>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
