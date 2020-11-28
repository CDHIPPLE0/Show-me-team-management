import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <center>
        <center className="loginWrapper">
          <LoginForm />
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </button>
        </center>
      </center>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
